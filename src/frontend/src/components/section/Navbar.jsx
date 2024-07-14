import React, { useState } from "react";

import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import {
  Home,
  Users2,
  Car,
  CarFront,
  CircleParking,
  CircleParkingOff,
} from "lucide-react";
import axios from "axios";
import LoadingSpinner from "../ui/loading";

export default function Navbar() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const vehicleEntry = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/enter_car");
      console.log(response);
      toast({
        variant: `${response.data.message ? "" : "destructive"}`,
        title: "Vehicle Entry",
        description:
          response.data.message ||
          response.data.error ||
          "Vehicle has entered the parking lot.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register vehicle entry.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const vehicleExit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/exit_car");
      console.log(response);
      toast({
        variant: `${response.data.message ? "" : "destructive"}`,
        title: "Vehicle Exit",
        description:
          response.data.message ||
          response.data.error ||
          "Vehicle has exited the parking lot.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register vehicle exit.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            to="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <CarFront className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/vehicles"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Add Vehicles</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Vehicles</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/logs"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Car className="h-5 w-5" />
                  <span className="sr-only">Vehicles Log</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Vehicles Log</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={vehicleEntry}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <CircleParking className="h-5 w-5" />
                  <span className="sr-only">Vehicle Entry</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Vehicle Entry</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={vehicleExit}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <CircleParkingOff className="h-5 w-5" />
                  <span className="sr-only">Vehicle Exit</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Vehicle Exit</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  );
}
