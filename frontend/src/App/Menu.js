import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts";
import styled from "styled-components";
import { InputGroupAlt, SelectAlt, NavButton, AButtonAlt, NavButtonAlt } from "../Components/Form";
import { EventNotifier } from "../Components/Event";
import { ThemeSelect } from "../Components/ThemeSelect";
import { LanguageSelect } from "../Components/LanguageSelect";
import { useAppLocaleOverrides } from "../i18n/loadLocaleOverrides";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { NavLinks, MobileNavButton, MobileNav } from "./Navigation";
import { useTranslation } from "react-i18next";


const Tlaimage = styled.div`
  padding: 0.5em;
  border-radius: 0 0 20px 20px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  transition: border-radius 0.1s ease-in-out;
  padding-top: 6.5em;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0f080a 0%, #180c10 40%, #100608 100%);
  border-bottom: 2px solid #c0161f;
  box-shadow: 0 2px 20px rgba(192,22,31,0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #c0161f, #e8222d, #c0161f, transparent);
    box-shadow: 0 0 10px rgba(192,22,31,0.6);
  }

  @media (max-width: 700px) {
    background-size: auto 100%;
    border-radius: ${(props) => props.mobileopen && "unset"};
  }
`;

const MyProfile = styled(NavLink).attrs((props) => ({
  activeClassName: "active",
}))`
  height: 2.5em;
  img {
    &:hover {
      opacity: 0.7;
    }
  }
`;

const NavBar = styled.div`
  margin-bottom: 2em;
`;

NavBar.LogoLink = styled(NavLink).attrs((props) => ({
  activeClassName: "active",
}))`
  margin-right: 2em;
  flex-grow: 0;
  line-height: 0;
  @media (max-width: 480px) {
    margin-right: unset;
    margin-left: auto;
  }
`;

NavBar.Logo = styled.img`
  width: 150px;
  filter: ${(props) => props.theme.logo.filter};
`;

NavBar.Menu = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-grow: 1;
`;

NavBar.Link = styled(NavLink).attrs((props) => ({
  activeClassName: "active",
}))`
  padding: 1em;
  color: ${(props) => props.theme.colors.accent4};
  text-decoration: none;
  &.active {
    color: ${(props) => props.theme.colors.active};
    font-weight: bold;
  }
`;

NavBar.End = styled.div`
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  > :not(:last-child) {
    @media (max-width: 480px) {
      margin-bottom: 0.4em;
    }
  }
`;

NavBar.Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 480px) {
    display: none;
  }
`;

NavBar.Name = styled.div`
  margin-right: 2em;
  @media (max-width: 480px) {
    margin-right: 0em;
    width: 100%;
  }
`;

const Mumble = () => {
  const authContext = useContext(AuthContext);

  return (
    <AButtonAlt
      title="Join our Mumble Server"
      href={`mumble://${authContext?.current ? encodeURIComponent(authContext.current.name) + '@' : ''}mumble.doomsdaydirective.online`}
    >
      <FontAwesomeIcon icon={faHeadset} />
    </AButtonAlt>
  );
};

export function Menu({ onChangeCharacter, theme, setTheme, sticker, setSticker }) {
  const { t } = useTranslation("nav");
  const [isOpenMobileView, setOpenMobileView] = React.useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  useAppLocaleOverrides();
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <AuthContext.Consumer>
      {(whoami) => (
        <NavBar>
        <Tlaimage mobileopen={isOpenMobileView}>
             {[28665,28661,33472,29990,28659,22442,22468,22474].map((id,i)=>(
               <img key={id} src={`https://images.evetech.net/types/${id}/render?size=512`} alt=""
                 style={{position:'absolute',height:'120%',top:'-10%',left:`calc(${i*13.1}% - 3%)`,width:'13.2%',opacity:0.22,filter:'drop-shadow(0 0 14px rgba(192,22,31,0.4))',objectFit:'contain',pointerEvents:'none',zIndex:0}} />
             ))}
             <div style={{position:'absolute',top:'0.6em',left:'1em',zIndex:1,pointerEvents:'none'}}>
             <div style={{fontSize:'10px',fontWeight:600,letterSpacing:'0.3em',textTransform:'uppercase',color:'#e8222d',marginBottom:'4px'}}>— EVE Online · Incursion Fleet</div>
              <div style={{fontFamily:'Courier New,monospace',fontWeight:900,fontSize:'clamp(22px,4vw,48px)',lineHeight:1,color:'#fff',textShadow:'0 0 20px rgba(192,22,31,0.5)',textTransform:'uppercase'}}>DTF</div>
              <div style={{fontFamily:'Courier New,monospace',fontSize:'clamp(9px,1.5vw,14px)',fontWeight:700,letterSpacing:'0.12em',color:'#e8222d',textTransform:'uppercase'}}>Down to Fly</div>
              </div>
              <NavBar.Menu>
              <NavBar.Main>
                <NavLinks whoami={whoami} />
              </NavBar.Main>
              <NavBar.End>
                {whoami && (
                  <>
                    <NavBar.Name>
                      <InputGroupAlt fixed>
                        <MyProfile exact to="/pilot" title="My Profile">
                          <img
                            style={{ maxHeight: "100%", borderRadius: "20px 0 0 20px" }}
                            src={`https://images.evetech.net/characters/${
                              whoami.current.id ?? 1
                            }/portrait?size=128`}
                            alt="Character Portrait"
                          />
                        </MyProfile>
                        <SelectAlt
                          value={whoami.current.id}
                          onChange={(evt) =>
                            onChangeCharacter && onChangeCharacter(parseInt(evt.target.value))
                          }
                          style={{ flexGrow: "1", border: "unset" }}
                        >
                          {whoami.characters.map((character) => (
                            <option key={character.id} value={character.id}>
                              {character.name}
                            </option>
                          ))}
                        </SelectAlt>
                        <NavButtonAlt exact to="/auth/start/alt">
                          +
                        </NavButtonAlt>
                      </InputGroupAlt>
                    </NavBar.Name>
                  </>
                )}

                <InputGroupAlt>
                  {width < 481 && (
                    <MobileNavButton isOpen={isOpenMobileView} setIsOpen={setOpenMobileView} />
                  )}
                  <Mumble />
                  <AButtonAlt title="Discord" href="https://discord.gg/BcDw7acf79">
                    <FontAwesomeIcon icon={faDiscord} />
                  </AButtonAlt>
                  <LanguageSelect />
                  <EventNotifier />
                  <ThemeSelect
                    theme={theme}
                    setTheme={setTheme}
                    sticker={sticker}
                    setSticker={setSticker}
                  />
                  {whoami ? (
                    <NavButtonAlt exact to="/auth/logout">
                      {t("logOut")}
                    </NavButtonAlt>
                  ) : (
                    <NavButton exact to="/auth/start" variant="primary">
                      {t("logIn")}
                    </NavButton>
                  )}
                </InputGroupAlt>
              </NavBar.End>
            </NavBar.Menu>
          </Tlaimage>
          <MobileNav isOpen={isOpenMobileView} whoami={whoami} />
        </NavBar>
      )}
    </AuthContext.Consumer>
  );
}
