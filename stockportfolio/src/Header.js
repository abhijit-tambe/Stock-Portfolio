import React from "react";
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import {Avatar, Typography} from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import logo from './stock logo.png';


function Header() {
  return (
    <div className="header">
      <div className="header__left">
        {/* <img src="https://static.dribbble.com/users/182238/screenshots/2383317/lion2.jpg" /> */}
        <img src={logo}/>
       {/* <h3> StockPortfolio</h3> */}
      {/* <div className="header__input">
          <SearchIcon/>
          <input type="text" placeholder="stock symbols"/>
      </div> */}
      </div>
      {/* <div className="header__middle">
          <div className="header__option">
              <HomeIcon/>
          </div>
          <div className="header__option">
              <HomeIcon/>
          </div>
          <div className="header__option">
              <HomeIcon/>
          </div>
          <div className="header__option">
              <HomeIcon/>
          </div>
          <div className="header__option">
              <HomeIcon/>
          </div>
      </div> */}
      <div className="header__right ">
      <div className="header__info">
              <Avatar/>
          <h4>Abhijit Tambe</h4>
          
          </div>
         
          {/* <IconButton>
                <AddIcon/>
              </IconButton>
              <IconButton>
                  <NotificationsActiveIcon/>
              </IconButton>
              <IconButton>
                  <ExpandMoreIcon/>
              </IconButton> */}
      </div>
    </div>
  );
}

export default Header;
