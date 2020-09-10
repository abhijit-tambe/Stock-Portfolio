import React from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import PieChartIcon from '@material-ui/icons/PieChart';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import BarChartIcon from '@material-ui/icons/BarChart';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ShowChartIcon from '@material-ui/icons/ShowChart';
function Sidebar() {
    return (
        <div className="sidebar">
        <div className="my__portfolio">
        <h5>MY PORTFOLIO</h5>
        <SidebarRow Icon={PieChartIcon} title="Overview"/>
        <SidebarRow Icon={DesktopMacIcon} title="My Holdings"/>
        <SidebarRow Icon ={BarChartIcon}title="My portfolio Analysis"/>
        <SidebarRow Icon ={EmojiObjectsIcon}title="Crowd Insights"/>
        </div>
        <div className="general">
        <h5>GENERAL</h5>
        <SidebarRow Icon={StarHalfIcon} title="My Performance"/>
        <SidebarRow Icon={ShowChartIcon}title="Screener"/>
        </div>
        </div>
    )
}

export default Sidebar
