"use client";

import styled from "styled-components";
import coverImage from "../../public/images/cover_bg_3.jpg";

export const ContainerWrapper = styled.div`
  .mainWrapper {
    background-color: transparent;
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    height: 600px;
    width: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgb(2 35 46 / 87%);
  }
  .displayT {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .displayTc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 600px;
  }

  .profile-image {
    background-size: cover !important;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    height: 200px;
    width: 200px;
    margin: 0 auto;
    margin-bottom: 10px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    border-radius: 50%;
    background-image: url("../../public/images/user.gif");
  }

  .name-text {
    font-family: cursive;
    margin-bottom: 20px;
    font-size: 50px;
    line-height: 1.3;
    font-weight: 300;
    -webkit-transform: rotate(-5deg);
    -moz-transform: rotate(-5deg);
    -ms-transform: rotate(-5deg);
    -o-transform: rotate(-5deg);
    transform: rotate(-5deg);
  }
  .role-text {
    font-family: cursive;
    letter-spacing: 2px;
    color: whitesmoke;
    margin-bottom: 10px;
  }
`;
