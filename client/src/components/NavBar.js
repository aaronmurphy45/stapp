import React from 'react'
import { Button, Menu , Typography , Avatar}  from 'antd'
import {Link} from 'react-router-dom'
import {HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined , MenuOutlined, MailOutlined, StockOutlined} from '@ant-design/icons'
import { logout } from '../firebase/firebase-config'

import { Breadcrumb } from 'antd';
import {  AppstoreOutlined, SettingOutlined } from '@ant-design/icons';


//import iconx from '../../public/cryptocurrency.png';

const { SubMenu } = Menu;

export default function NavBar(props) {

    const  {current } = 'mail';
    const Logout = () => {
        //history("/homepage");
        window.location = "/";
        logout();
    }

    const handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
      };
    
    
    return (

        <div>
           <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
         <Link to="/homepage">
            <Menu.Item key="home" icon = {<HomeOutlined></HomeOutlined>}>
                  Home
            </Menu.Item>
            </Link>
        <Link to = "/favourites">
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
            Favourites
        </Menu.Item>
        </Link>
        <Link to = "/mostpopular">
        <Menu.Item key="app" icon={<StockOutlined />}>
            Most Popular
        </Menu.Item>
        </Link>
        
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Markets">
          <Menu.ItemGroup title="Item 1">
            <Link to = "LSE"><Menu.Item key="setting:1">London Stock Exchange</Menu.Item></Link>
            <Link to = "NASDAQ"><Menu.Item key="setting:2">NASDAQ</Menu.Item></Link>
            <Link to = "NYSE"><Menu.Item key="setting:3">NYSE</Menu.Item></Link>
            <Menu.Item key="setting:4">S&P 500</Menu.Item>
            <Menu.Item key="setting:5">Dow Jones</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Other Markets">
            <Menu.Item key="setting:6">CryptoCurrencies</Menu.Item>
            <Menu.Item key="setting:7">Forex</Menu.Item>
            <Menu.Item key="setting:8">Commodities</Menu.Item>
            <Menu.Item key="setting:9">Bonds</Menu.Item>
            <Menu.Item key="setting:10">NFT's</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        
      </Menu>
        </div>


    )
}
 
