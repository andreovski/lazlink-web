import { SkeletonServices } from "@/components/layouts/skeleton-services";
import { Button } from "@/components/ui/button";
import { TextClamped } from "@/components/ui/text-clamped";
import { useAppContext } from "@/context/app-context";
import { Scheduling } from "@/pages/app/scheduling";
import { FaCalendar } from "react-icons/fa";

import { ArticleIll } from "@/assets/articles-ill";
import { NothingToShowIll } from "@/assets/nothing-to-show-ill";

export function ProfileServices() {
  const { isLoadingProfessional, professional } = useAppContext();

  const services: IService[] = [
    {
      _id: "2112",
      title: "Servico 3",
      description: "minha description",
      value: 12.4,
      serviceTime: "01:30",
      advancePayment: false,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-8 pb-4 md:gap-12">
      <h1 className="flex text-xl font-semibold">Serviços</h1>

      <div className="flex w-full flex-col gap-3">
        <div className="flex max-h-[500px] flex-col gap-3 overflow-auto">
          {isLoadingProfessional ? (
            <SkeletonServices />
          ) : services.length ? (
            services.map((service, idx) => (
              <div
                key={idx}
                className="flex w-full items-start justify-between gap-2"
              >
                <div className="flex flex-1 flex-col">
                  <h1 className="text-lg font-medium">{service.title}</h1>
                  <TextClamped lines={3}>{service.description}</TextClamped>

                  <p className="flex justify-end gap-1">
                    <p className="text-sm">R$</p>
                    {service.value.toFixed(2)}
                  </p>
                </div>

                <Scheduling service={service}>
                  <Button variant="ghost">
                    <FaCalendar />
                  </Button>
                </Scheduling>
              </div>
            ))
          ) : (
            <EmptyService />
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyService() {
  const { isAuthenticated } = useAppContext();

  if (isAuthenticated) {
    return (
      <div className="flex h-full w-full flex-col gap-4">
        <div className="space-y-1">
          <p className="text-lg font-semibold text-neutral-500 dark:text-neutral-300">
            Você não possuí nenhum serviço cadastrado
          </p>
          <p>
            Clique em <b>"Adicionar serviços"</b> para ter seus serviços
            visíveis
          </p>
        </div>
        <div className="h-[60%] w-full text-primary">
          <ArticleIll />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-2 md:gap-4">
      <div className="h-[60%] w-full text-primary">
        <NothingToShowIll />
      </div>
      <p className="text-center text-lg font-light">
        Esse profissional ainda não cadastrou nenhum serviço.
      </p>
    </div>
  );
}
