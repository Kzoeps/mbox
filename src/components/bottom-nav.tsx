import { useContext, useEffect, useState } from "react";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import useCurrentPath from "../hooks/useCurrentPath";
import { useNavigate } from "react-router-dom";
import {
  INDEX_LOCATION,
  LOCATION_INDEX_MAP,
} from "../constants/misc.constants";
import styles from "./bottom-nav.module.css";
import { UserContext } from "./user-context";
import { AiOutlineCamera, AiOutlineHome } from "react-icons/ai";
import { BiReceipt } from "react-icons/bi";

export interface BottomNavProps {}

export const BottomNav = (props: BottomNavProps) => {
  const { user } = useContext(UserContext);
  const location = useCurrentPath();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState<number>(0);
  useEffect(() => {
    if (location) {
      setTabIndex(LOCATION_INDEX_MAP[location]);
    }
  }, [location]);
  if (!user || location === "/capture") {
    return <></>;
  }
  return (
    <>
      <div style={{ marginBottom: "80px" }} />
      <div className={styles.bottomNav}>
        <Tabs
          size={"md"}
          onChange={(index) => navigate(INDEX_LOCATION[index])}
          index={tabIndex}
          style={{ position: "fixed", bottom: 0, width: "100%" }}
          isFitted
          variant="unstyled"
        >
          <TabList background={"white"}>
            <Tab _selected={{ color: "white", bg: "orange.500" }}>
              <AiOutlineHome />
            </Tab>
            <Tab _selected={{ color: "white", bg: "orange.500" }}>
              <AiOutlineCamera />
            </Tab>
            <Tab _selected={{ color: "white", bg: "orange.500" }}>
              <BiReceipt />
            </Tab>
          </TabList>
        </Tabs>
      </div>
    </>
  );
};

export default BottomNav;
