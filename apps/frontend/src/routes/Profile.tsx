import * as React from "react";
import { Card, CardContent, styled } from "@mui/material";
// import josephImage from "../../assets/employees/joe-cardarelli.jpeg";
import { useAuth0 } from "@auth0/auth0-react";

const CustomCardContent = styled(CardContent)({
  display: "flex",
  "&:last-child": {
    padding: 0,
    paddingBottom: 0,
  },
});

export default function Profile() {
  const { user } = useAuth0();

  return (
    <div className="bg-offwhite h-screen">
      <div className="flex justify-center">
        {/*First profile section*/}
        <div className="flex flex-col">
          <Card
            className="shadow-xl drop-shadow m-4"
            sx={{ borderRadius: "20px" }}
          >
            <div className="w-[20vw] h-[94vh] bg-white rounded-[30px] ">
              <CustomCardContent>
                <div className="w-full h-full flex justify-center ">
                  <img
                    className="w-60 h-60 object-cover rounded-full flex justify-center"
                    src={user!.picture}
                    alt="User photo"
                  />
                </div>
              </CustomCardContent>
              <div className=" flex flex-col relative">
                <p
                  className="w-full text-2xl font-bold text-center p-1 "
                  style={{ color: "#012D5A" }}
                >
                  {user!.name}
                </p>
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700 " />
                  <div className="absolute px-2 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                    <span className="shrink px-1 pb-1 "> Information</span>
                  </div>
                </div>
                <label className="text-xl text-center">Role</label>
                <label className=" text-center">{user!.email}</label>

                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700 " />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col">
          <Card
            className="shadow-xl drop-shadow m-4"
            sx={{ borderRadius: "20px" }}
          >
            <div className="w-[50vw] h-[45vh] bg-white rounded-[30px]">
              <h1 className="w-full text-2xl font-bold text-center ">
                {" "}
                Completed Service Requests
              </h1>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <CustomCardContent></CustomCardContent>
            </div>
          </Card>

          <Card
            className="shadow-xl drop-shadow m-4"
            sx={{ borderRadius: "20px" }}
          >
            <div className="w-[50vw] h-[45vh] bg-white rounded-[30px]">
              <CustomCardContent>Quadrant 3 Content</CustomCardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
    // </div>
  );
}
