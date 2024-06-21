import React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { daysToSchedule } from "./utils";
import { SettingsSchedulesForm } from "./settings-schedules-form";

export function SettingsSchedules() {
  return (
    <DrawerContent>
      <div className="flex justify-between p-4">
        <DrawerTitle className="text-lg">Editar Horários</DrawerTitle>
        <DrawerClose>
          <FaTimes />
        </DrawerClose>
      </div>

      <div className="relative flex h-full w-full flex-col gap-8 px-8">
        <p className="text-sm text-neutral-500">
          Aqui você pode editar seus horários de atendimento.
        </p>

        <div className="space-y-3">
          {daysToSchedule.map((day, idx, arr) => (
            <React.Fragment key={day.value}>
              <div className="grid w-full grid-cols-12 items-center gap-2 rounded bg-background px-2">
                <p className="col-span-10 font-medium">{day.name}</p>

                <Drawer direction="right" modal={false}>
                  <DrawerTrigger asChild>
                    <Button variant="ghost" className="col-span-2 p-0">
                      <FaChevronRight />
                    </Button>
                  </DrawerTrigger>

                  <SettingsSchedulesForm item={day} />
                </Drawer>
              </div>

              {idx !== arr.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </DrawerContent>
  );
}
