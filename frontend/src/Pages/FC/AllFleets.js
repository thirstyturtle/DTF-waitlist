import React from "react";
import styled from "styled-components";
import { useApi } from "../../api";
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

const FleetChip = styled.span`
  padding: 0.3em 0.8em;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.accent3};
  background: ${(props) => props.theme.colors.accent1};
  font-weight: 600;
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
        <b>{fleet.boss.name}</b> <em style={{ opacity: 0.7 }}>— no fleet data (boss not in fleet?)</em>
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
  const [status, refreshStatus] = useApi("/api/fleet/status");

  React.useEffect(() => {
    const timer = setInterval(() => refreshStatus && refreshStatus(), REFRESH_MS);
    return () => clearInterval(timer);
  }, [refreshStatus]);

  const fleets = (status && status.fleets) || [];

  return (
    <>
      <FleetList>
        <b>Active fleets:</b>
        {!status && <em>loading...</em>}
        {status && fleets.length === 0 && <em>none</em>}
        {fleets.map((fleet) => (
          <FleetChip key={fleet.id}>
            {fleet.boss.name}
            <small>fleet {fleet.id}</small>
          </FleetChip>
        ))}
      </FleetList>
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
    </>
  );
}
