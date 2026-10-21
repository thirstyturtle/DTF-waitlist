import styled from "styled-components";

const Wrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  background: linear-gradient(135deg, #0f080a 0%, #180c10 40%, #100608 100%);
  border: 1px solid #c0161f;
  padding: clamp(20px, 4vw, 40px) clamp(20px, 4vw, 44px);
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 30px; height: 30px;
    background: ${(props) => props.theme.colors.background};
    clip-path: polygon(0 0, 100% 0, 0 100%);
    z-index: 3;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0; right: 0;
    width: 30px; height: 30px;
    background: ${(props) => props.theme.colors.background};
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    z-index: 3;
  }
`;

const ScanLine = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #c0161f, #e8222d, #c0161f, transparent);
  box-shadow: 0 0 12px rgba(192,22,31,0.45), 0 0 24px rgba(192,22,31,0.15);
`;

const ScanLineBottom = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c0161f, transparent);
`;

const SideBar = styled.div`
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, transparent, #c0161f, #e8222d, #c0161f, transparent);
  box-shadow: 0 0 10px rgba(192,22,31,0.45);
`;

const GridBg = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(192,22,31,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(192,22,31,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, transparent 70%);
  pointer-events: none;
`;

const ShipsLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
`;

const ShipImg = styled.img`
  position: absolute;
  height: 120%;
  top: -10%;
  opacity: 0.20;
  filter: drop-shadow(0 0 14px rgba(192,22,31,0.35));
  object-fit: contain;
`;

const Insignia = styled.div`
  position: absolute;
  right: clamp(16px, 5vw, 48px);
  top: 50%;
  transform: translateY(-50%);
  width: clamp(60px, 10vw, 110px);
  height: clamp(60px, 10vw, 110px);
  opacity: 0.18;
  z-index: 2;
`;

const Content = styled.div`
  position: relative;
  z-index: 4;
  max-width: 580px;
`;

const Eyebrow = styled.div`
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(10px, 1.2vw, 12px);
  font-weight: 600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #e8222d;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-family: 'Orbitron', monospace;
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const DTFText = styled.span`
  display: block;
  font-size: clamp(32px, 7vw, 72px);
  color: #fff;
  text-shadow: 0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(192,22,31,0.45);
`;

const SubText = styled.span`
  display: block;
  font-size: clamp(13px, 2.5vw, 28px);
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #e8222d;
  text-shadow: 0 0 20px rgba(192,22,31,0.45);
  margin-top: 2px;
`;

const Tagline = styled.p`
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(11px, 1.6vw, 15px);
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7a6a6d;
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(192,22,31,0.25);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Dot = styled.span`
  width: 3px;
  height: 3px;
  background: #c0161f;
  border-radius: 50%;
  flex-shrink: 0;
  display: inline-block;
`;

const Gold = styled.span`
  color: #c49a52;
`;

const CornerTL = styled.div`
  position: absolute;
  top: 8px; left: 8px;
  width: 14px; height: 14px;
  border-top: 2px solid #e8222d;
  border-left: 2px solid #e8222d;
  z-index: 5;
`;

const CornerBR = styled.div`
  position: absolute;
  bottom: 8px; right: 8px;
  width: 14px; height: 14px;
  border-bottom: 2px solid #e8222d;
  border-right: 2px solid #e8222d;
  z-index: 5;
`;

// EVE Online ship type IDs for DTF fleet doctrine
const SHIPS = [
  { id: 22448, right: "2%",   label: "Claymore" },
  { id: 22460, right: "14%",  label: "Damnation" },
  { id: 22452, right: "26%",  label: "Eos" },
  { id: 28659, right: "37%",  label: "Kronos" },
  { id: 29990, right: "50%",  label: "Loki" },
  { id: 33472, right: "62%",  label: "Nestor" },
  { id: 28661, right: "74%",  label: "Paladin" },
  { id: 28665, right: "86%",  label: "Vargur" },
];

const DTFBanner = () => (
  <Wrap>
    <GridBg />
    <ScanLine />
    <ScanLineBottom />
    <SideBar />
    <CornerTL />
    <CornerBR />
    <ShipsLayer>
      {SHIPS.map((ship) => (
        <ShipImg
          key={ship.id}
          src={`https://images.evetech.net/types/${ship.id}/render?size=512`}
          alt=""
          style={{ right: ship.right }}
        />
      ))}
    </ShipsLayer>
    <Insignia>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="90" stroke="#c0161f" strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="75" stroke="#c0161f" strokeWidth="0.5" strokeDasharray="4 6"/>
        <circle cx="100" cy="100" r="60" stroke="#c0161f" strokeWidth="1"/>
        <circle cx="100" cy="100" r="40" stroke="#c0161f" strokeWidth="0.5"/>
        <line x1="100" y1="10" x2="100" y2="40" stroke="#c0161f" strokeWidth="1.5"/>
        <line x1="100" y1="160" x2="100" y2="190" stroke="#c0161f" strokeWidth="1.5"/>
        <line x1="10" y1="100" x2="40" y2="100" stroke="#c0161f" strokeWidth="1.5"/>
        <line x1="160" y1="100" x2="190" y2="100" stroke="#c0161f" strokeWidth="1.5"/>
        <polygon points="100,55 110,80 100,75 90,80" fill="#c0161f"/>
        <polygon points="100,145 110,120 100,125 90,120" fill="#c0161f"/>
        <circle cx="100" cy="100" r="8" fill="#c0161f"/>
        <circle cx="100" cy="100" r="4" fill="#0a0608"/>
      </svg>
    </Insignia>
    <Content>
      <Eyebrow>EVE Online · Incursion Fleet</Eyebrow>
      <Title>
        <DTFText>DTF</DTFText>
        <SubText>Down to Fly</SubText>
      </Title>
      <Tagline>
        <span>Highsec Incursions</span>
        <Dot />
        <span>Marauders · Logistics · Command</span>
        <Dot />
        <Gold>Sansha&apos;s Nation will fall</Gold>
      </Tagline>
    </Content>
  </Wrap>
);

export default DTFBanner;
