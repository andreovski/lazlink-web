import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useState } from "react";
import { FaBars, FaChevronRight } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { dndReorder } from "@/utils/dnd";
import { useSize } from "@/utils/hooks/useSize";

import { SettingsServicesForm } from "./settings-services-form";
import { serviceMock } from "./utils";

export function SettingsServicesRow() {
  const { isMd } = useSize();

  const [services, setServices] = useState(serviceMock);

  const onDragEnd = (result: DropResult) => {
    // TODO: SEND NEW ORDER TO BACKEND

    if (!result.destination) return;

    const items = dndReorder(
      services,
      result.source.index,
      result.destination.index,
    );
    setServices(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="services" type="list" direction="vertical">
        {(provided) => (
          <div
            ref={provided.innerRef}
            className="flex w-full flex-col gap-2"
            {...provided.droppableProps}
          >
            {services.map((service, idx) => (
              <Draggable
                key={service.id}
                index={idx}
                draggableId={`${service.id}`}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    {...(!isMd && {
                      style: {
                        ...provided.draggableProps.style,
                        position: "static",
                      },
                    })}
                    ref={provided.innerRef}
                    className="grid w-full grid-cols-12 items-center gap-3 rounded border border-input bg-background p-1"
                  >
                    <FaBars className="col-span-2 mx-auto" />
                    <p className="col-span-8">{service.name}</p>

                    {/* //* Open EDIT */}
                    <Drawer direction="right" modal={false}>
                      <DrawerTrigger asChild>
                        <Button variant="ghost" className="col-span-2 p-0">
                          <FaChevronRight />
                        </Button>
                      </DrawerTrigger>

                      <SettingsServicesForm
                        defaultValues={{
                          name: "Programação Web",
                          description:
                            "Garoto de programa, programando programas web",
                          serviceTime: "30",
                          value: "120.03",
                        }}
                      />
                    </Drawer>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
