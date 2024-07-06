import * as Yup from "yup";

export const settingsServicosValidationSchema = Yup.object({
  title: Yup.string().required("Esse campo é obrigatório ser informado"),
  description: Yup.string()
    .max(1000, "Limite de texto excedido")
    .required("Informe uma descrição para o serviço"),
  serviceTime: Yup.string().required("Esse campo é obrigatório ser informado"),
  value: Yup.string().required("Esse campo é obrigatório ser informado"),
  advancePayment: Yup.boolean().required("Esse campo é obrigatório"),
});

export const serviceTimeValues = [
  {
    label: "10 minutos",
    value: "10",
  },
  {
    label: "15 minutos",
    value: "15",
  },
  {
    label: "20 minutos",
    value: "20",
  },
  {
    label: "30 minutos",
    value: "30",
  },
  {
    label: "40 minutos",
    value: "40",
  },
  {
    label: "45 minutos",
    value: "45",
  },
  {
    label: "1 hora",
    value: "60",
  },
];

export const serviceMock = [
  {
    name: "Programador Web",
    id: 1,
    description: "oi",
    serviceTime: "60",
    value: "129.99",
  },
  {
    name: "Programador Back-end",
    id: 2,
    description: "tudo bem?",
    serviceTime: "60",
    value: "129.99",
  },
];
