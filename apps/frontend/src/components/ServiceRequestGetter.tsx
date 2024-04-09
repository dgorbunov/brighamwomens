import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIEndpoints } from "common/src/APICommon.ts";
import { ServiceRequest } from "database";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Button,
} from "@mui/material";
// import { FormControl } from "react-bootstrap";
// import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const statusOptions = ["Unassigned", "Assigned", "InProgress", "Closed"];
export function ServiceRequestGetter() {
  const [requestData, setRequestData] = useState<ServiceRequest[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterBySearch, setFilterBySearch] = useState("");
  const [filterByPriority, setFilterByPriority] = useState("Any");
  const [filterByStatus, setFilterByStatus] = useState("Any");
  const [filteredData, setFilteredData] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(APIEndpoints.serviceGetRequests);
        const sortedData = res.data.sort(
          (a: ServiceRequest, b: ServiceRequest) => {
            return sortOrder === "asc"
              ? a.serviceID - b.serviceID
              : b.serviceID - a.serviceID;
          },
        );
        setRequestData(sortedData);

        console.log("Successfully got data from get request:", res.data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    }
    fetchData();
  }, [sortOrder]);

  useEffect(() => {
    let data = requestData;

    if (filterBySearch) {
      data = data.filter((item) =>
        item.location
          .toString()
          .toLowerCase()
          .includes(filterBySearch.toLowerCase()),
      );
    }

    if (filterByPriority != "Any") {
      data = data.filter((item) => item.priority.includes(filterByPriority));
    }

    if (filterByStatus != "Any") {
      data = data.filter((item) => item.status.includes(filterByStatus));
    }

    const sortedData = data.sort((a, b) => {
      return sortOrder === "asc"
        ? a.serviceID - b.serviceID
        : b.serviceID - a.serviceID;
    });

    setFilteredData(sortedData);
  }, [
    requestData,
    filterBySearch,
    filterByPriority,
    filterByStatus,
    sortOrder,
  ]);

  // const sortedData = requestData.sort((a, b) => {
  //     return sortOrder === "asc" ? a.serviceID - b.serviceID : b.serviceID - a.serviceID;
  // });

  function truncateString(str: string, num: number) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  async function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    serviceID: number,
  ) {
    const newStatus = event.target.value;

    const updatedRequests = requestData.map((request) => {
      if (request.serviceID === serviceID) {
        return { ...request, status: newStatus };
      }
      return request;
    });

    setRequestData(updatedRequests);

    const updateData = {
      serviceID: serviceID,
      status: newStatus,
    };

    try {
      const response = await axios.patch(
        APIEndpoints.servicePutRequests,
        updateData,
      );
      console.log("Status updated successfully", response.data);
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update status. Please try again.");
    }
  }

  return (
    <div className="relative">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-2 sm:space-y-0 items-center justify-between pb-2">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-[20rem] bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search by Location"
            onChange={(e) => setFilterBySearch(e.target.value)}
          />
        </div>
        <div>
          <FormControl sx={{ width: "8rem", marginRight: "1rem" }} size="small">
            <InputLabel sx={{ color: "#a4aab5", fontSize: ".9rem" }}>
              Priority
            </InputLabel>
            <Select
              name="priority"
              className="bg-gray-50"
              sx={{ fontSize: ".9rem" }}
              label="priority"
              size="small"
              value={filterByPriority}
              onChange={(e) => setFilterByPriority(e.target.value)}
            >
              <MenuItem value="Any">Any</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Emergency">Emergency</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "8rem", marginRight: "1rem" }} size="small">
            <InputLabel sx={{ color: "#a4aab5", fontSize: ".9rem" }}>
              Status
            </InputLabel>
            <Select
              name="Status"
              className="bg-gray-50"
              sx={{ fontSize: ".9rem" }}
              label="Status"
              size="small"
              value={filterByStatus}
              onChange={(e) => setFilterByStatus(e.target.value)}
            >
              <MenuItem value="Any">Any</MenuItem>
              <MenuItem value="Unassigned">Unassigned</MenuItem>
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="InProgress">InProgress</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#0146B1",
            }}
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            Toggle ID Sort
          </Button>
        </div>
      </div>
      <table className="w-70vw mx-auto text-sm text-center rtl:text-right text-gray-500 m-2 shadow-md">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Service ID
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Priority
            </th>
            <th scope="col" className="px-6 py-3">
              Requesting Username
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Assigned To
            </th>

            <th scope="col" className="px-6 py-3">
              Entered Time
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((request) => (
            <tr className="bg-white border-b" key={request.serviceID}>
              <td className="px-6 py-4">{request.serviceID}</td>
              <td className="px-6 py-4">{truncateString(request.type, 20)}</td>
              <td className="px-6 py-4">
                <select
                  value={request.status}
                  onChange={(e) => handleStatusChange(e, request.serviceID)}
                  className="border border-gray-300 rounded px-3 py-1 text-center"
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4">
                {truncateString(request.priority, 10)}
              </td>
              <td className="px-6 py-4">
                {truncateString(request.requestingUsername, 15)}
              </td>
              <td className="px-6 py-4">
                {truncateString(request.location, 15)}
              </td>
              <td className="px-6 py-4">
                {request.description && request.description.trim() !== ""
                  ? truncateString(request.description, 20)
                  : "N/A"}
              </td>
              <td className="px-6 py-4">
                {truncateString(request.assignedTo, 15)}
              </td>
              <td className="px-6 py-4">
                {truncateString(request.enteredTime.toString(), 20)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
