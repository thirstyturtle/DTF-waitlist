import { useState, useMemo } from "react";
import { useApi } from "../../api";
import { usePageTitle } from "../../Util/title";
import { PageTitle } from "../../Components/Page";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px 12px;
  border-bottom: 2px solid ${(p) => p.theme.colors.accent2};
  color: ${(p) => p.theme.colors.text};
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: ${(p) => p.theme.colors.highlight};
  }
`;

const Td = styled.td`
  padding: 6px 12px;
  border-bottom: 1px solid ${(p) => p.theme.colors.accent1};
  color: ${(p) => p.theme.colors.text};
`;

const Tr = styled.tr`
  &:hover td {
    background: ${(p) => p.theme.colors.accent1};
  }
`;

function formatHours(hours) {
  if (hours < 0.1) return "—";
  return `${Math.round(hours * 10) / 10}h`;
}

function formatDate(ts) {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleDateString();
}

const COLUMNS = [
  { key: "rank",         label: "#",            get: (_, i) => i + 1,         numeric: true  },
  { key: "name",         label: "FC Name",      get: (fc) => fc.name,         numeric: false },
  { key: "fleets_run",   label: "Fleets Run",   get: (fc) => fc.fleets_run,   numeric: true  },
  { key: "month_hours",  label: "Last 30 Days", get: (fc) => fc.month_hours,  numeric: true  },
  { key: "year_hours",   label: "Last Year",    get: (fc) => fc.year_hours,   numeric: true  },
  { key: "total_hours",  label: "All Time",     get: (fc) => fc.total_hours,  numeric: true  },
  { key: "first_fleet",  label: "First Fleet",  get: (fc) => fc.first_fleet,  numeric: true  },
  { key: "last_fleet",   label: "Last Fleet",   get: (fc) => fc.last_fleet,   numeric: true  },
];

function sortIndicator(col, sortKey, sortAsc) {
  if (col !== sortKey) return " ↕";
  return sortAsc ? " ↑" : " ↓";
}

export function FCUptime() {
  usePageTitle("FC Uptime");
  const [data] = useApi("/api/stats/fc_uptime");
  const [sortKey, setSortKey] = useState("total_hours");
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = useMemo(() => {
    if (!data) return [];
    const col = COLUMNS.find((c) => c.key === sortKey);
    return [...data].sort((a, b) => {
      const av = col.get(a, 0);
      const bv = col.get(b, 0);
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = col.numeric ? av - bv : av.localeCompare(bv);
      return sortAsc ? cmp : -cmp;
    });
  }, [data, sortKey, sortAsc]);

  function handleSort(key) {
    if (key === "rank") return; // rank is derived, not sortable
    if (sortKey === key) {
      setSortAsc((a) => !a);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  if (!data) {
    return <em>Loading FC uptime stats...</em>;
  }

  return (
    <>
      <PageTitle>FC Uptime</PageTitle>
      <Table>
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <Th key={col.key} onClick={() => handleSort(col.key)}>
                {col.label}{sortIndicator(col.key, sortKey, sortAsc)}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((fc, i) => (
            <Tr key={fc.character_id}>
              <Td>{i + 1}</Td>
              <Td>{fc.name}</Td>
              <Td>{fc.fleets_run}</Td>
              <Td>{formatHours(fc.month_hours)}</Td>
              <Td>{formatHours(fc.year_hours)}</Td>
              <Td>{formatHours(fc.total_hours)}</Td>
              <Td>{formatDate(fc.first_fleet)}</Td>
              <Td>{formatDate(fc.last_fleet)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
