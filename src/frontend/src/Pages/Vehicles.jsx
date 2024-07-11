import React, { useEffect, useState } from "react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { createCar, getCars } from "../app/asyncThunks";

export default function AddVehicles() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [ownerName, setOwnerName] = useState("");
  const [ownerDesignation, setOwnerDesignation] = useState("");
  const [carNumberPlate, setCarNumberPlate] = useState("");

  const cars = useSelector((state) => state.car.cars);
  const loading = useSelector((state) => state.car.loading);
  const error = useSelector((state) => state.car.error);

  const handleCarNumberPlateChange = (event) => {
    const uppercaseValue = event.target.value.toUpperCase();
    const alphanumericValue = uppercaseValue.replace(/[^A-Z0-9]/g, "");
    setCarNumberPlate(alphanumericValue);
  };

  const handleSubmit = async (event) => {
    dispatch(createCar({ carNumberPlate, ownerName, ownerDesignation, token }));
  };

  useEffect(() => {
    dispatch(getCars(token));
  }, [cars]);

  return (
    <div className="ml-16">
      <div className="flex flex-row justify-end p-5 ">
        <Sheet className="">
          <SheetTrigger asChild>
            <Button variant="outline" className="bg-white text-black">
              Add New User
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[500px]">
            <SheetHeader>
              <SheetTitle>Add Vehicle Information</SheetTitle>
              <SheetDescription>
                Add Vehicles to Get your Vehicle Verified
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="items-center">
                  <Label htmlFor="name" className="text-right mb-3">
                    Owner Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John, Racheal, etc"
                    value={ownerName}
                    onChange={(event) => setOwnerName(event.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className=" items-center ">
                  <Label htmlFor="designation" className="text-right mb-3">
                    Owner Designation
                  </Label>
                  <Input
                    id="designation"
                    placeholder="Teacher, Principal, etc"
                    value={ownerDesignation}
                    onChange={(event) =>
                      setOwnerDesignation(event.target.value)
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="items-center ">
                  <Label htmlFor="name" className="text-right mb-3">
                    License Plate Number
                  </Label>
                  <Input
                    id="name"
                    placeholder="AB01CD1234"
                    value={carNumberPlate}
                    onChange={handleCarNumberPlateChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Add User</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full p-5">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle className="text-4xl">Users</CardTitle>
          </CardHeader>
          <CardContent>
            {cars.data && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Owner Name</TableHead>
                    <TableHead>Owner Designation</TableHead>
                    <TableHead>License Plate Number</TableHead>
                    <TableHead>Is Parked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cars.data?.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell className="font-medium">
                        {car.ownerName}
                      </TableCell>
                      <TableCell>{car.ownerDesignation}</TableCell>
                      <TableCell>{car.carNumberPlate}</TableCell>
                      <TableCell>{car.isParked ? "Yes" : "No"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
