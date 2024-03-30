import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { Tooltip } from "@mui/material";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Tooltip title="Expand Menu">
          <img
            onClick={() => setExtended((prev) => !prev)}
            className="menu"
            src={assets.menu_icon}
            alt=""
          />
        </Tooltip>
        <div onClick={() => newChat()} className="new-chat">
          <Tooltip title="New Chat">
            <img src={assets.plus_icon} alt="" />
            {extended ? <p>New Chat</p> : null}
          </Tooltip>
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <Tooltip title="Help">
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null}
          </Tooltip>
        </div>
        <div className="bottom-item recent-entry">
          <Tooltip title="History">
            <img src={assets.history_icon} alt="" />
            {extended ? <p>Activity</p> : null}
          </Tooltip>
        </div>
        <div className="bottom-item recent-entry">
          <Tooltip title="Settings">
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Setting</p> : null}
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
