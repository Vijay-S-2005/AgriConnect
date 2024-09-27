import React from 'react';
import { useRouter } from 'next/navigation';
import {  useLocale } from "next-intl";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css'; 
import '../styles/globals.css'; 

const SideBar = ({ sidebarOpen, toggleSideBar }) => {
  const localeActive = useLocale();

    const router = useRouter();
    const handleProductLink=()=>{
        router.replace(`/${localeActive}/displayProduct`);
    }
  const categories = {
    "Daily Needs": {
      "Vegetables": ['Onion', 'Tomato', 'Carrot'],
      "Fruits": ['Apple', 'Banana', 'Mango'],
      "Dairy": ['Milk', 'Cheese', 'Butter'],
      "Fresh Meats": ['Chicken', 'Beef', 'Pork']
    },
    "FRESH ITEM": {
      "Millets": ['Bajra', 'Ragi', 'Jowar'],
      "Spices": ['Cumin', 'Coriander', 'Turmeric'],
      "Masala": ['Garam Masala', 'Chaat Masala'],
      "Nuts and Bi-products": ['Almonds', 'Cashews', 'Peanuts']
    }
  };

  return (
    <div>
      {sidebarOpen && (
        <>
          <ProSidebar className="custom-sidebar">
            <Menu iconShape="square">
              <MenuItem>
                <div className="menu-item" style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
                  Hello User
                </div>
              </MenuItem>

              <MenuItem>
                <div className="menu-item" style={{ fontWeight: 'bold', fontSize: '18px' }}>CATEGORIES</div>
              </MenuItem>

              {Object.keys(categories).map((mainCategory, index) => (
                <SubMenu key={index} title={mainCategory} className="submenu-title">
                  {Object.keys(categories[mainCategory]).map((subCategory, subIndex) => (
                    <SubMenu key={subIndex} title={subCategory}>
                      {categories[mainCategory][subCategory].map((item, itemIndex) => (
                        <MenuItem key={itemIndex} className="menu-item" onClick={handleProductLink}>{item}</MenuItem>
                      ))}
                    </SubMenu>
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </ProSidebar>

          <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={toggleSideBar}></div>
        </>
      )}
    </div>
  );
};

export default SideBar;
