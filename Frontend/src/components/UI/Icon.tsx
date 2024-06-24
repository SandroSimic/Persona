import { IconType } from "../../types/UI.types";
import styles from "./UI.module.scss";

const Icon = ({ icon, className, color }: IconType) => {
  const icons: Record<string, JSX.Element> = {
    email: (
      <svg
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          {" "}
          <g id="style=linear">
            {" "}
            <g id="email">
              {" "}
              <path
                id="vector"
                d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                stroke={color ? color : "#000000"}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />{" "}
              <path
                id="vector_2"
                d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
                stroke={color ? color : "#000000"}
                stroke-width="1.5"
                stroke-linecap="round"
              />{" "}
            </g>{" "}
          </g>{" "}
        </g>
      </svg>
    ),
    password: (
      <svg
        width="64px"
        height="64px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M9 16C9 16.5523 8.55229 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55229 15 9 15.4477 9 16Z"
            fill={color ? color : "#000000"}
          />{" "}
          <path
            d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
            fill={color ? color : "#000000"}
          />{" "}
          <path
            d="M16 17C16.5523 17 17 16.5523 17 16C17 15.4477 16.5523 15 16 15C15.4477 15 15 15.4477 15 16C15 16.5523 15.4477 17 16 17Z"
            fill={color ? color : "#000000"}
          />{" "}
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.25 8V9.30277C5.02317 9.31872 4.80938 9.33948 4.60825 9.36652C3.70814 9.48754 2.95027 9.74643 2.34835 10.3483C1.74643 10.9503 1.48754 11.7081 1.36652 12.6082C1.24996 13.4752 1.24998 14.5775 1.25 15.9451V16.0549C1.24998 17.4225 1.24996 18.5248 1.36652 19.3918C1.48754 20.2919 1.74643 21.0497 2.34835 21.6516C2.95027 22.2536 3.70814 22.5125 4.60825 22.6335C5.47522 22.75 6.57754 22.75 7.94513 22.75H16.0549C17.4225 22.75 18.5248 22.75 19.3918 22.6335C20.2919 22.5125 21.0497 22.2536 21.6517 21.6516C22.2536 21.0497 22.5125 20.2919 22.6335 19.3918C22.75 18.5248 22.75 17.4225 22.75 16.0549V15.9451C22.75 14.5775 22.75 13.4752 22.6335 12.6082C22.5125 11.7081 22.2536 10.9503 21.6517 10.3483C21.0497 9.74643 20.2919 9.48754 19.3918 9.36652C19.1906 9.33948 18.9768 9.31872 18.75 9.30277V8C18.75 4.27208 15.7279 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8ZM12 2.75C9.10051 2.75 6.75 5.10051 6.75 8V9.25344C7.12349 9.24999 7.52152 9.24999 7.94499 9.25H16.0549C16.4783 9.24999 16.8765 9.24999 17.25 9.25344V8C17.25 5.10051 14.8995 2.75 12 2.75ZM4.80812 10.8531C4.07435 10.9518 3.68577 11.1322 3.40901 11.409C3.13225 11.6858 2.9518 12.0743 2.85315 12.8081C2.75159 13.5635 2.75 14.5646 2.75 16C2.75 17.4354 2.75159 18.4365 2.85315 19.1919C2.9518 19.9257 3.13225 20.3142 3.40901 20.591C3.68577 20.8678 4.07435 21.0482 4.80812 21.1469C5.56347 21.2484 6.56459 21.25 8 21.25H16C17.4354 21.25 18.4365 21.2484 19.1919 21.1469C19.9257 21.0482 20.3142 20.8678 20.591 20.591C20.8678 20.3142 21.0482 19.9257 21.1469 19.1919C21.2484 18.4365 21.25 17.4354 21.25 16C21.25 14.5646 21.2484 13.5635 21.1469 12.8081C21.0482 12.0743 20.8678 11.6858 20.591 11.409C20.3142 11.1322 19.9257 10.9518 19.1919 10.8531C18.4365 10.7516 17.4354 10.75 16 10.75H8C6.56459 10.75 5.56347 10.7516 4.80812 10.8531Z"
            fill={color ? color : "#000000"}
          />{" "}
        </g>
      </svg>
    ),
    eye: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="32" height="32" fill="url(#pattern0_69_73)" />
        <defs>
          <pattern
            id="pattern0_69_73"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_69_73" transform="scale(0.0208333)" />
          </pattern>
          <image
            id="image0_69_73"
            width="48"
            height="48"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC4ElEQVR4nO2Y32vPURjHX7NNC/ObFil3wxab/AGU4sLPC7mYH1vNDbnyIxeSwtWE/Cr5UdsKJYrSyG9S3Ci0UrJyqRjhAttMz3q+9ez0Mc9Z332/Ls6rTn07n/N+zvP5nOc85zlfSCQSiUQiwWxgE3ASuAu8A7qBXm3y+y1wBzgONACziv3dZgJ7gZdA/zDbC2APUFVIx2uAS/pl+/PUfgFtwJyRdHwacBboy3DgB3AL2AesAOYCk4BSoEx/y4uvAvZrKP3MsCMf5TQwOd/OrwU+Zkwo4dMEVA7D5gSgGejMsPsBWJkPx8t004UT3AeW5mMCoARYDjzOmOeIruKwqNSltgYlmzQyMpQAW4AvwZwdwJhYY+OBp4GhmwXKFjOA28Hcj4BxXgOjNZdbA2ecS1mq+0Uyyhvguzb53QqsAUY5Q/d84IMkiXLPC5wLhJJZPCwBXjtS5itgsTOkDgRayVBD0hAIWpzObwd6IvJ+j2o8HAu06/82UOL7c7BknrBpDCb4pLm+HhirrV77uoOxm53hZENabEzPGnjRDOrSw+dfVOshltPdA6YMMX6qjrEHYLVjHrH53uhkjw1iAfDbDJCN6OGa0TwDKhwaGfPc6K4651pnNFIN1NqHV8zDB06DVaaskBJgHn5qTC3VF5Ge7WF32ebd3AaUVVjoNNYcHDaxiCanF1seFgUF4MCL7zKdDyMcaDE6sRGLnfdwhM6uwg7peGI6YsqEVqPbGO8/G4y+PULXZHTyMgMnZS6OJUt4OWEMbYv3n61GLze5mLI+t3++ScdB4KueejHsNg5cIB7R5PRiK4ZD6nysz4OoCw4Xqe+9TAwOtTqKhL2MSEh5OWV0nRSR1UFpsDMy+/TrNbOotAcOXQfmZ4yT0/5GMLaN/4CKjJtbrp7q0NaV8Vw0ntKjIEjFeNT5V0uv3nVF899RoyFly3Kbqdoia6aiUa7V4jJttd7rYCKRSCQSiQSF4w/T2VWvRib4dQAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    ),
    closedEye: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="32" height="32" fill="url(#pattern0_69_74)" />
        <defs>
          <pattern
            id="pattern0_69_74"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_69_74" transform="scale(0.0416667)" />
          </pattern>
          <image
            id="image0_69_74"
            width="24"
            height="24"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABgUlEQVR4nO3UTUtVURTG8R9aZChBIWmhUEEQac4Swm/QsEIQ7yCivoQTm0Wz6AvUQDEbhaQYBUJB83IQvgwcqIMgiAp0ICob1onNGeS53gsS+Ic9OHuv9TxnrbP24ZgGuYQxvMc6tvAbq3iFh+g4jHAPprGDvQPWTzxGW1XxIfyK5G28xB30hkh64+t4hIXM6BvOVDG4FwmvcbFC/C18jdZ1Va2iXX204LSj5Br6mqjXjxv5xnf8ibFslCvxPX7km5PxYeejn4elBR9CK2n+5UJUkQ6eNGDwLDSSVnf5cDib6adorUP4JJ5n+bfLAeexWLqhC3GhDuImPpdy53CqCDiXiS/Grd2M5x3MoIarMevt2U2exW7EbuBB1uq5ogujmXiqJHEW7yr8h4o1HTnFiBYmA6KUWhaQOIGlCHqBt1jLBJcxFW+5F1XmXMbdf/X1fiSuhFlBYVDQmf0YB9XBl0iqlfbLBmKs095EPQbj0ZrWCgaptW8wogl8wsdmCP0/7APj9XeNzVdGIQAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    ),
    apple: (
      <svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_69_75)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.8741 5.58752C24.1499 4.10879 25.01 2.04921 24.7746 0C22.936 0.07 20.7116 1.17451 19.3933 2.65149C18.2094 3.96222 17.176 6.05657 17.4538 8.06555C19.5047 8.21778 21.5982 7.06799 22.8741 5.58752ZM27.4732 18.5938C27.5245 23.8909 32.3219 25.653 32.375 25.6758C32.3361 25.8 31.6088 28.1866 29.848 30.6541C28.3244 32.7855 26.7442 34.9084 24.2543 34.9539C21.8088 34.9976 21.0213 33.5645 18.2236 33.5645C15.4276 33.5645 14.5534 34.9082 12.2388 34.9974C9.83569 35.0832 8.00416 32.6914 6.46992 30.5669C3.33066 26.2217 0.932864 18.2877 4.15352 12.9327C5.75324 10.2745 8.61113 8.58863 11.715 8.54663C14.0739 8.50288 16.3018 10.0676 17.744 10.0676C19.1862 10.0676 21.8937 8.18639 24.7392 8.46289C25.9301 8.51014 29.2747 8.92299 31.4212 11.9347C31.2478 12.0379 27.4308 14.1663 27.4732 18.5938Z"
            fill={color ? color : "#000000"}
          />
        </g>
        <defs>
          <clipPath id="clip0_69_75">
            <rect width="35" height="35" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    user: (
      <svg
        width="20"
        height="25"
        viewBox="0 0 20 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0001 10.9948C12.9456 10.9948 15.3334 8.60698 15.3334 5.66146C15.3334 2.71594 12.9456 0.328125 10.0001 0.328125C7.05456 0.328125 4.66675 2.71594 4.66675 5.66146C4.66675 8.60698 7.05456 10.9948 10.0001 10.9948Z"
          fill="#C2C2C2"
          stroke="white"
          stroke-width="0.0520833"
        />
        <path
          d="M10.0001 13.6614C3.33342 13.6614 0.666748 14.9948 0.666748 18.9948V24.3385H19.3334V18.9948C19.3334 14.9687 16.6667 13.6614 10.0001 13.6614Z"
          fill="#C2C2C2"
          stroke="white"
          stroke-width="0.0520833"
        />
      </svg>
    ),
    file: (
      <svg
        width="56"
        height="44"
        viewBox="0 0 56 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.3333 16.6666C17.3333 10.7756 22.109 5.99996 28 5.99996C33.8909 5.99996 38.6667 10.7756 38.6667 16.6666V19.3333H41.3333C46.488 19.3333 50.6667 23.512 50.6667 28.6666C50.6667 33.8213 46.488 38 41.3333 38H38.6667C37.1939 38 36 39.1938 36 40.6666C36 42.1394 37.1939 43.3333 38.6667 43.3333H41.3333C49.4336 43.3333 56 36.7669 56 28.6666C56 21.4114 50.732 15.3865 43.8123 14.2086C42.6299 6.53897 36.0008 0.666626 28 0.666626C19.9993 0.666626 13.3702 6.53897 12.1876 14.2086C5.26803 15.3865 0 21.4114 0 28.6666C0 36.7669 6.56648 43.3333 14.6667 43.3333H17.3333C18.8061 43.3333 20 42.1394 20 40.6666C20 39.1938 18.8061 38 17.3333 38H14.6667C9.512 38 5.33333 33.8213 5.33333 28.6666C5.33333 23.512 9.512 19.3333 14.6667 19.3333H17.3333V16.6666ZM37.8856 25.4477L29.8856 17.4477C28.8443 16.4063 27.1557 16.4063 26.1144 17.4477L18.1144 25.4477C17.073 26.489 17.073 28.1776 18.1144 29.2189C19.1558 30.2602 20.8442 30.2602 21.8856 29.2189L25.3333 25.7712V40.6666C25.3333 42.1394 26.5272 43.3333 28 43.3333C29.4728 43.3333 30.6667 42.1394 30.6667 40.6666V25.7712L34.1144 29.2189C35.1557 30.2602 36.8443 30.2602 37.8856 29.2189C38.9269 28.1776 38.9269 26.489 37.8856 25.4477Z"
          fill={color ? color : "#BCBCBC"}
        />
      </svg>
    ),
  };

  return <div className={`${styles.icon} ${className}`}>{icons[icon]}</div>;
};

export default Icon;
