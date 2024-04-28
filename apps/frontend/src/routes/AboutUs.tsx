import * as React from "react";
import josephImage from "../../assets/employees/joe-cardarelli.jpeg";
import danielImage from "../../assets/employees/dan-gorbunov.jpeg";
// import FormContainer from "../components/FormContainer.tsx";
import mattImage from "../../assets/employees/matt-brown.jpeg";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import andyImage from "../../assets/employees/andy-truong.jpeg";
import vivekImage from "../../assets/employees/vivek-jagadeesh.jpeg";
import ademImage from "../../assets/employees/adem.jpeg";
import suliImage from "../../assets/employees/sulaiman.jpeg";
import frankyImage from "../../assets/employees/franky.jpeg";
import colinImage from "../../assets/employees/colin.jpeg";
import griffinImage from "../../assets/employees/griffin-brown.jpeg";
import taehaImage from "../../assets/employees/taeha-song.jpeg";
import wongImage from "../../assets/employees/wilsonwong.jpg";
// import FormContainer from "../components/FormContainer.tsx";
import background from "../../assets/hero/bwh-exterior-default.png";
import { Card, CardContent, styled } from "@mui/material";
import ArrowIosForwardComponent from "../components/ArrowComponent.tsx";
import { Link } from "react-router-dom";
import paths from "../common/paths.tsx";
import EmployeeCard from "../components/EmployeeCard.tsx";

const employees = [
  { name: "Daniel Gorbunov ", role: "Lead SWE", imageSrc: danielImage },
  { name: "Matthew Brown", role: "Project Manager", imageSrc: mattImage },
  { name: "Andy Troung ", role: "Assistant Lead", imageSrc: andyImage },
  { name: "Vivek Jagadeesh ", role: "Assistant Lead", imageSrc: vivekImage },
  { name: "Mohamed Adem Djadid ", role: "Scrum Master", imageSrc: ademImage },
  { name: "Sulaiman Moukheiber  ", role: "Product Owner", imageSrc: suliImage },
  { name: "Francesco Di Mise ", role: "Documentation", imageSrc: frankyImage },
  { name: "Colin Mascucci ", role: "Frontend", imageSrc: colinImage },
  { name: "Griffin Brown", role: "Algorithm", imageSrc: griffinImage },
  { name: "Taeha Song", role: "Frontend", imageSrc: taehaImage },
  { name: "Joseph Cardarelli", role: "Team Coach", imageSrc: josephImage },
  { name: "Wilson Wong", role: "Professor", imageSrc: wongImage },
];

const CustomCardContent = styled(CardContent)({
  display: "flex",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

export default function AboutUs() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 overflow-hidden bg-cover bg-no-repeat bg-center blur-sm"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="h-screen overflow-auto">
        <div className="flex justify-center w-full">
          <div className="flex flex-col items-center gap-2 mx-5 my-8">
            <Card
              className="shadow-xl drop-shadow w-full max-w-5xl overflow-hidden"
              sx={{ borderRadius: "20px" }}
            >
              <CustomCardContent>
                {/*<div className="bg-lime-900">*/}

                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    margin: "2rem",
                    position: "relative",
                  }}
                  className="custom-form-container"
                >
                  {/*<div style={{ display: "flex", alignItems: "center" }}>*/}
                  <div className="flex items-center justify-between w-full">
                    <h1 className="text-4xl flex-grow text-center ml-6">
                      About Us
                    </h1>
                    <Link
                      to={paths.CREDIT}
                      onClick={() => paths.CREDIT}
                      className="flex items-center flex-row"
                    >
                      <span className="absolute right-[30px]"> Credits</span>
                      <ArrowIosForwardComponent />
                    </Link>
                  </div>
                  <p style={{ color: "olive" }}>
                    {" "}
                    WPI Computer Science Department
                  </p>
                  <p style={{ color: "grey" }}>
                    {" "}
                    CS3733-D24 (Software Engineering)
                  </p>
                  <br />
                  <hr className="pl-96 pr-96" />
                  <br />
                  {/*<p style={{color: "grey"}}> Professor. Wilson Wong🐻</p>*/}
                  <br />

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    {employees.map((employee, index) => (
                      <div key={index}>
                        <EmployeeCard
                          name={employee.name}
                          role={employee.role}
                          imageSrc={employee.imageSrc}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <br />
                    <p style={{ color: "#012D5A", textAlign: "center" }}>
                      Thanks to Brigham and Womens Hospital and their
                      represenative, Andrew Shin
                    </p>
                    <label>
                      The B&WH maps and data used in this app are copyrighted
                      and for educational use only
                    </label>
                  </div>
                </div>
              </CustomCardContent>
              {/*</div>*/}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}