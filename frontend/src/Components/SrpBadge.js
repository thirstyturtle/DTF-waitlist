import styled, { css, keyframes } from "styled-components";
import { useApi } from "../api";
import { getCharacterCountText } from "../Util/srpCharacterCount";

const UNPAID_NOTE =
  "CCP's endpoint only updates once an hour, so don't worry if it still says unpaid after making a payment";

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 6px rgba(232,34,45,0.45), inset 0 0 0 1px rgba(255,255,255,0.08); }
  50%      { box-shadow: 0 0 18px rgba(232,34,45,0.85), inset 0 0 0 1px rgba(255,255,255,0.15); }
`;

const Wrap = styled.div`
  position: absolute;
  bottom: calc(100% + 0.5em);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 2;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.35em 1em;
  font-family: "Courier New", monospace;
  font-size: 0.85em;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  border-radius: 3px;
  clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);

  ${(p) =>
    p.$unpaid
      ? css`
          background: linear-gradient(135deg, #c0161f 0%, #e8222d 50%, #a0121a 100%);
          border: 1px solid #ff4d55;
          cursor: pointer;
          animation: ${pulse} 2.4s ease-in-out infinite;
        `
      : css`
          background: linear-gradient(135deg, rgba(15,8,10,0.92) 0%, rgba(24,12,16,0.92) 100%);
          border: 1px solid #c0161f;
          box-shadow: 0 0 12px rgba(192,22,31,0.35);
          cursor: default;
        `}
`;

const Dot = styled.span`
  color: #e8222d;
  text-shadow: 0 0 6px rgba(232,34,45,0.8);
  font-size: 0.9em;
`;

const Coverage = styled.span`
  font-size: 0.8em;
  letter-spacing: 0.05em;
  color: ${(p) => (p.$unpaid ? "rgba(255,255,255,0.85)" : "#e8222d")};
`;

export function SrpBadge({ characterId }) {
  const [srpStatus] = useApi(`/api/srp/status?character_id=${characterId}`);
  if (!srpStatus || !srpStatus.status) return null;
  const unpaid = srpStatus.status === "Unpaid";
  const coverage =
    srpStatus.payment_amount && srpStatus.coverage_type
      ? getCharacterCountText(srpStatus.payment_amount, srpStatus.coverage_type)
      : null;
  return (
    <Wrap>
      <Badge
        $unpaid={unpaid}
        title={unpaid ? UNPAID_NOTE : undefined}
        onClick={unpaid ? () => alert(UNPAID_NOTE) : undefined}
      >
        {!unpaid && <Dot>●</Dot>}
        SRP: {srpStatus.status}
        {coverage && <Coverage $unpaid={unpaid}>({coverage})</Coverage>}
      </Badge>
    </Wrap>
  );
}
