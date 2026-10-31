import React from "react";
import { useApi } from "../../api";
import { Title } from "../../Components/Page";
import { usePageTitle } from "../../Util/title";
import { FleetMembers } from "./FleetStats";

const REFRESH_MS = 30000;

// Admin view: every registered fleet with its live member composition (read-only).
export function AllFleets() {
  usePageTitle("All Fleets");
  const [status, refreshStatus] = useApi("/api/fleet/status");
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
      if (refreshStatus) refreshStatus();
    }, REFRESH_MS);
    return () => clearInterval(timer);
  }, [refreshStatus]);

  if (!status) {
    return <em>Loading fleets...</em>;
  }
  const fleets = status.fleets || [];

  return (
    <>
      <Title>All Fleets</Title>
      <p>
        {fleets.length} active fleet{fleets.length === 1 ? "" : "s"} · refreshes every{" "}
        {REFRESH_MS / 1000}s · read-only
      </p>
      {fleets.length === 0 && <em>No fleets are registered right now.</em>}
      {fleets.map((fleet) => (
        <div
          key={fleet.id}
          style={{ marginBottom: "2em", paddingBottom: "1em", borderBottom: "1px solid rgba(128,128,128,0.3)" }}
        >
          <h2 style={{ marginBottom: "0.25em" }}>
            {fleet.boss.name} <span style={{ opacity: 0.6, fontSize: "0.7em" }}>fleet {fleet.id}</span>
          </h2>
          <FleetMembers key={`${fleet.id}-${tick}`} characterIdOverride={fleet.boss.id} readOnly />
        </div>
      ))}
    </>
  );
}
