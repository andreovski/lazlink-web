import * as Yup from "yup";

import { timeStringToMinutes } from "@/utils";

export const validationSchema = Yup.object({
  hours: Yup.array(
    Yup.object({
      initialTime: Yup.string()
        .required("Campo obrigatório")
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Formato inválido. Use HH:mm"),
      finalTime: Yup.string()
        .required("Campo obrigatório")
        .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Formato inválido. Use HH:mm")
        .test(
          "is-greater",
          "O horário final deve ser posterior ao horário inicial",
          function (value) {
            const { initialTime } = this.parent;
            return (
              timeStringToMinutes(value) > timeStringToMinutes(initialTime)
            );
          },
        ),
    }),
  ),
});

export const daysToSchedule = [
  {
    name: "Segunda-feira",
    value: 1,
  },
  {
    name: "Terça-feira",
    value: 2,
  },
  {
    name: "Quarta-feira",
    value: 3,
  },
  {
    name: "Quinta-feira",
    value: 4,
  },
  {
    name: "Sexta-feira",
    value: 5,
  },
  {
    name: "Sabado",
    value: 6,
  },
  {
    name: "Domingo",
    value: 7,
  },
];

export const defaultHoursValue = {
  initialTime: "09:00",
  finalTime: "18:00",
};
