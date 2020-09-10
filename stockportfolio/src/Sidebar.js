import React from 'react';
import './Sidebar.css';
import SidebarRow from './SidebarRow';
import PieChartIcon from '@material-ui/icons/PieChart';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import BarChartIcon from '@material-ui/icons/BarChart';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

function Sidebar() {
    return (
        <div className="sidebar">
        <div className="my__portfolio">
        <h6>MY PORTFOLIO</h6>
        <SidebarRow Icon={PieChartIcon} title="Overview"/>
        <SidebarRow Icon={DesktopMacIcon} title="My Holdings"/>
        <SidebarRow Icon ={BarChartIcon}title="My portfolio Analysis"/>
        <SidebarRow Icon ={EmojiObjectsIcon}title="Crowd Insights"/>
        </div>
        <div className="general">
        <h6>General</h6>
        <SidebarRow title="My Performance"/>
        <SidebarRow title="Screener"/>
        </div>
        </div>
    )
}

export default Sidebar
