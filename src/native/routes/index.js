import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import ReceiptsContainer from '../../containers/Receipts';
import ReceiptListingComponent from '../components/Receipt/Listing';
import ReceiptSingleComponent from '../components/Receipt/Single';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/User/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/User/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/User/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/User/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/User/Profile';

import AboutComponent from '../components/About';

import CameraContainer from '../../containers/NewCamera';
// import GalleryScreen from '../../containers/GalleryScreen';
import ListItems from '../../containers/ListItems';

import Payment from '../../containers/Payment';
import InvitationEmail from '../../containers/InvitationEmail';

// import ReceiptForm from "../../containers/receiptForm"

const Index = (
  <Stack hideNavBar>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="profile"
          title="PROFILE"
          icon={() => <Icon name="contact" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene
            back
            key="profileHome"
            component={MemberContainer}
            Layout={ProfileComponent}
          />
          <Scene
            back
            key="signUp"
            title="SIGN UP"
            {...DefaultProps.navbarProps}
            component={SignUpContainer}
            Layout={SignUpComponent}
          />
          <Scene
            back
            key="login"
            title="LOGIN"
            {...DefaultProps.navbarProps}
            component={LoginContainer}
            Layout={LoginComponent}
          />
          <Scene
            back
            key="forgotPassword"
            title="FORGOT PASSWORD"
            {...DefaultProps.navbarProps}
            component={ForgotPasswordContainer}
            Layout={ForgotPasswordComponent}
          />
          <Scene
            back
            key="updateProfile"
            title="UPDATE PROFILE"
            {...DefaultProps.navbarProps}
            component={UpdateProfileContainer}
            Layout={UpdateProfileComponent}
          />
        </Stack>
        {/* <Scene
          key="userbills"
          title="All Receipts"
          component={ReceiptSingleComponent}
        /> */}
        <Stack
          key="camera"
          title="CAMERA"
          icon={() => <Icon name="camera" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="camera" component={CameraContainer} />
        </Stack>

        <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="planet" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={AboutComponent} />
        </Stack>

        <Stack
          key="receipts"
          title="RECEIPTS"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene
            key="receipt"
            component={ReceiptsContainer}
            Layout={ReceiptListingComponent}
          />
        </Stack>

        {/* <Stack
          key="payment"
          title="PAYMENT"
          icon={() => <Icon name="ios-cash" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        > */}
      </Tabs>
      <Scene key="payment" title="Payment" component={Payment} />
      <Scene
        key="invitationEmail"
        title="InvitationEmail"
        component={InvitationEmail}
      />
    </Scene>

    <Scene
      back
      clone
      key="receipt"
      title="RECEIPT"
      {...DefaultProps.navbarProps}
      component={ReceiptsContainer}
      Layout={ReceiptSingleComponent}
    />

    <Scene
      back
      clone
      key="camera"
      title="CAMERA"
      {...DefaultProps.navbarProps}
      component={CameraContainer}
    />
    <Scene
      back
      clone
      key="receiptItems"
      title="RECEIPT ITEMS"
      {...DefaultProps.navbarProps}
      component={ListItems}
    />
  </Stack>
);

export default Index;
