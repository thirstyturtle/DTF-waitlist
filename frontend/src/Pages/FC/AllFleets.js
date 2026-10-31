import React from "react";
import styled from "styled-components";
import { useApi } from "../../api";
import { AuthContext, InviteTargetContext } from "../../contexts";
import { usePageTitle } from "../../Util/title";
import { FleetMembers } from "./FleetStats";
import { FleetPageWaitlist } from "../Waitlist";

const REFRESH_MS = 30000;

const FleetList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.5em;
`;

const FleetChip = styled.button`
  padding: 0.3em 0.8em;
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.selected ? props.theme.colors.success.color : props.theme.colors.accent3)};
  box-shadow: ${(props) =>
    props.selected ? `0 0 0 1px ${props.theme.colors.success.color}` : "none"};
  background: ${(props) => props.theme.colors.accent1};
  color: inherit;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  small {
    font-weight: normal;
    opacity: 0.65;
    margin-left: 0.4em;
  }
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

// One fleet's compact stats (same panel as the Waitlist page's "Fleet Stats"); right-click a
// member to assign a MOTD role in that fleet.
// FleetMembers polls by itself every 15s; if the fleet can't be loaded it hides itself.
function FleetSide({ fleet }) {
  const [active, setActive] = React.useState(true);
  const deactivate = React.useCallback(() => setActive(false), []);
  if (!active) {
    return (
      <div>
        <b>{fleet.boss.name}</b>{" "}
        <em style={{ opacity: 0.7 }}>— no fleet data (boss not in fleet?)</em>
      </div>
    );
  }
  return (
    <div>
      <b>{fleet.boss.name}</b>
      <FleetMembers
        fleetpage={false}
        setStatTempActive={(v) => !v && deactivate()}
        characterIdOverride={fleet.boss.id}
      />
    </div>
  );
}

// Admin view: active fleets/FCs on top, then the waitlist laid out like the Waitlist page
// with every fleet's stats in the side column.
export function AllFleets() {
  usePageTitle("All Fleets");
  const authContext = React.useContext(AuthContext);
  const [status, refreshStatus] = useApi("/api/fleet/status");
  const [inviteTarget, setInviteTarget] = React.useState(null);

  React.useEffect(() => {
    const timer = setInterval(() => refreshStatus && refreshStatus(), REFRESH_MS);
    return () => clearInterval(timer);
  }, [refreshStatus]);

  const fleets = (status && status.fleets) || [];

  // Invites go to the selected fleet. Default: your own fleet if you're a boss, else the first one.
  const bossIds = fleets.map((f) => f.boss.id);
  const target = bossIds.includes(inviteTarget)
    ? inviteTarget
    : bossIds.includes(authContext.current.id)
    ? authContext.current.id
    : bossIds[0] || null;
  const targetFleet = fleets.find((f) => f.boss.id === target);

  return (
    <>
      <FleetList>
        <b>Invite into:</b>
        {!status && <em>loading...</em>}
        {status && fleets.length === 0 && <em>none</em>}
        {fleets.map((fleet) => (
          <FleetChip
            key={fleet.id}
            selected={fleet.boss.id === target}
            title="Click to send waitlist invites into this fleet"
            onClick={() => setInviteTarget(fleet.boss.id)}
          >
            {fleet.boss.id === target ? "✓ " : ""}
            {fleet.boss.name}
            <small>fleet {fleet.id}</small>
          </FleetChip>
        ))}
      </FleetList>
      {targetFleet && (
        <p style={{ margin: "0 0 0.5em", opacity: 0.8 }}>
          Invite buttons below send pilots into <b>{targetFleet.boss.name}</b>&apos;s fleet.
        </p>
      )}
      <InviteTargetContext.Provider value={target}>
        <FleetPageWaitlist
          side={
            fleets.length > 0 ? (
              <SideColumn>
                {fleets.map((fleet) => (
                  <FleetSide key={fleet.id} fleet={fleet} />
                ))}
              </SideColumn>
            ) : null
          }
        />
      </InviteTargetContext.Provider>
    </>
  );
}
