import React from 'react';
import HeaderBar from 'header-bar';
 
class Test extends React.Component {
    render(){ 
        return(
        <div>
        <HeaderBar
          hamburger={{ src:'/img/hamburger.svg', title:'Menu' }}
        >
            <a href='//localhost' data-logo={true}><img src='/img/logo.svg' title='logo'/></a>
            <a href='//nav.link.href' data-nav={true} data-color='rgb(64, 124, 156)' data-match='nav.link.href'>nav-link-1</a>
            <a href='//localhost' data-nav={true} data-color='goldenrod' data-match='local(.*)'>nav-link-2</a>
            <a href='//facebook.com' data-subnav={true} data-color='rgb(62, 86, 155)'><img src='/img/facebook.svg'/></a>
            <a href='//sub.nav.link' data-subnav={true} data-color='rgb(229, 26, 0)'>sub-nav-link</a>
            <div data-submenu_button={true} data-submenu_key='login'>
                <img src='/img/facebook.svg' style={{height: '1.8em', borderRadius: '0.9em'}}/>
                <span title='login'>設定</span>
            </div>
            <div data-submenu_button={true} data-submenu_key='logpeople'><span title='logpeople'>紀錄</span></div>
            <div data-submenu_item={true}  data-submenu_key='login' data-submenu_position='header'>
                <div style={{color: 'rgb(24, 155, 202)'}}>VIP會員</div>
            </div>
            <div data-submenu_item={true}  data-submenu_key='login' data-submenu_position='body'>
                <a href='/user-info' title='User Info'>修改個人資訊</a>
            </div>
            <div data-submenu_item={true}  data-submenu_key='login' data-submenu_position='body'>
                <a href='/change-password' title='User Info'>更改密碼</a>
            </div>
            <div data-submenu_item={true}  data-submenu_key='login' data-submenu_position='footer'>
                <a href='/logout' title='Logout'>登出</a>
            </div>
            <div data-submenu_item={true} data-submenu_key='logpeople'>
                <a href='/pay-history' title='Pay History'>購買紀錄</a>
            </div>
        </HeaderBar>
        </div>
        );
    }
}

export default Test;