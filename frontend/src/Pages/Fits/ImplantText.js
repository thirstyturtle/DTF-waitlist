import { Highlight } from "../../Components/Form";
import { Copyable } from "../../Components/Copy";
import { ToastContext } from "../../contexts";
import React from "react";
import {
  CellHead,
  SmallCellHead,
  Table,
  TableHead,
  Row,
  TableBody,
  Cell,
} from "../../Components/Table";

// ---------------------------------------------------------------------------
// Implant tables, one per Fits tab.
//
// Each row is one implant slot with a "default" and an "alternative" column.
// A column is a list of entries:
//   { label: "Paladin" }                      -> bold heading ("Paladin:")
//   { item: "LE-1006", note: "+6% ..." }      -> click-to-copy implant + note
// ---------------------------------------------------------------------------

const ARMOR_IMPLANTS = [
  { slot: 1, default: [{ item: "High-grade Ascendancy Alpha" }], alternative: [] },
  { slot: 2, default: [{ item: "High-grade Ascendancy Beta" }], alternative: [] },
  { slot: 3, default: [{ item: "High-grade Ascendancy Gamma" }], alternative: [] },
  { slot: 4, default: [{ item: "High-grade Ascendancy Delta" }], alternative: [] },
  { slot: 5, default: [{ item: "High-grade Ascendancy Epsilon" }], alternative: [] },
  {
    slot: 6,
    default: [{ item: "WS-618", note: "+18% warp speed" }],
    alternative: [{ item: "High-grade Ascendancy Omega", note: "+21% warp speed" }],
  },
  {
    slot: 7,
    default: [
      { label: "Kronos/Paladin/Vindicator" },
      { item: "Ogdin's Eye", note: "+6% Tracking" },
      { label: "Vargur" },
      { item: "TA-706", note: "+6% Falloff" },
    ],
    alternative: [
      { item: "MR-706", note: "+6% Tracking" },
      { label: "Logi" },
      { item: "RA-706", note: "-6% Cap use for remote reps" },
    ],
  },
  {
    slot: 8,
    default: [{ item: "EM-806", note: "+6% Capacitor" }],
    alternative: [
      { item: "Zor's Custom Navigation Hyper-Link", note: "+5% MWD/AB Speed" },
      { label: "Vindicator" },
      { item: "MR-807", note: "+7% Web range" },
    ],
  },
  {
    slot: 9,
    default: [{ item: "RF-906", note: "+6% rate of fire for all turrets" }],
    alternative: [
      { item: "SS-906", note: "+6% damage for all turrets" },
      { item: "Pashan's Turret Customization Mindlink", note: "+7% rate of fire for all turrets" },
    ],
  },
  {
    slot: 10,
    default: [
      { label: "Kronos/Vindicator" },
      { item: "LH-1006", note: "+6% hybrid weapon damage" },
      { label: "Paladin" },
      { item: "LE-1006", note: "+6% energy weapon damage" },
      { label: "Vargur" },
      { item: "LP-1006", note: "+6% projectile weapon damage" },
    ],
    alternative: [
      { label: "Paladin" },
      { item: "Pashan's Turret Handling Mindlink", note: "+7% energy weapon damage" },
      { label: "Logi" },
      { item: "HG-1006", note: "+6% Armor hitpoints" },
      { item: "HG-1008", note: "+8% Armor hitpoints" },
    ],
  },
];

// Shield and Booster start as copies of the Armor table - edit them independently.
const SHIELD_IMPLANTS = JSON.parse(JSON.stringify(ARMOR_IMPLANTS));
const BOOSTER_IMPLANTS = JSON.parse(JSON.stringify(ARMOR_IMPLANTS));

export const IMPLANT_TABLES = {
  Armor: ARMOR_IMPLANTS,
  Shield: SHIELD_IMPLANTS,
  Booster: BOOSTER_IMPLANTS,
};

// Tabs without their own table (Advanced, Elite, Other, Antigank, ...) use this one.
export const DEFAULT_IMPLANT_TIER = "Armor";

export function implantTierFor(tier) {
  return IMPLANT_TABLES[tier] ? tier : DEFAULT_IMPLANT_TIER;
}

export function ImplantTable({ tier }) {
  const toastContext = React.useContext(ToastContext);
  const rows = IMPLANT_TABLES[implantTierFor(tier)];

  return (
    <Table style={{ width: "100%" }}>
      <TableHead>
        <Row>
          <SmallCellHead></SmallCellHead>
          <CellHead>DEFAULT</CellHead>
          <CellHead>ALTERNATIVE</CellHead>
        </Row>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <Row key={row.slot}>
            <Cell>
              <b>Slot {row.slot}</b>
            </Cell>
            <Cell>
              <ImplantEntries toast={toastContext} entries={row.default} />
            </Cell>
            <Cell>
              <ImplantEntries toast={toastContext} entries={row.alternative} />
            </Cell>
          </Row>
        ))}
      </TableBody>
    </Table>
  );
}

function ImplantEntries({ toast, entries }) {
  return (
    <>
      {entries.map((entry, index) => (
        <React.Fragment key={index}>
          {index > 0 && <br />}
          {entry.label ? (
            <b>{entry.label}:</b>
          ) : (
            <>
              <CopyImplantText toast={toast} item={entry.item} />
              {entry.note ? ` ${entry.note}` : null}
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

function CopyImplantText({ toast, item }) {
  return (
    <Highlight
      onClick={(evt) => {
        Copyable(toast, item);
      }}
    >
      {item}
    </Highlight>
  );
}
