import * as Yup from "yup";

export const settingsProfileValidationSchema = Yup.object({
  avatar: Yup.mixed().nullable().notRequired(),
  name: Yup.string().required("Esse campo é obrigatório ser informado"),
  useEnterpriseName: Yup.boolean(),
  enterpriseName: Yup.string().when(
    "useEnterpriseName",
    ([useEnterpriseName], schema) => {
      return useEnterpriseName
        ? schema.required("O nome da empresa deve ser informado")
        : schema.notRequired();
    },
  ),
  work: Yup.string().required("Esse campo é obrigatório ser informado"),
  description: Yup.string().max(1000, "Limite de texto excedido"),
  phone: Yup.string()
    .required("Esse campo é obrigatório ser informado")
    .min(11, "Informe um número válido"),
  isWhatsApp: Yup.boolean(),
  whatsappPhone: Yup.string().when("isWhatsApp", ([isWhatsApp], schema) => {
    return !isWhatsApp
      ? schema
          .required("É obrigatório informar o número de WhatsApp")
          .min(11, "Informe um número válido")
      : schema;
  }),
  showAddress: Yup.boolean(),
  postalCode: Yup.string().required("Esse campo é obrigatório ser informado"),
  street: Yup.string().required("Esse campo é obrigatório ser informado"),
  city: Yup.string().required("Esse campo campo é obrigatório ser informado"),
  state: Yup.string().required("Esse campo campo é obrigatório ser informado"),
  complement: Yup.string().notRequired(),
  instagram: Yup.string().notRequired(),
  linkedIn: Yup.string().notRequired(),
  facebook: Yup.string().notRequired(),
  twitter: Yup.string().notRequired(),
});

export const externalLinkFormSchema = Yup.object({
  externalLinks: Yup.array(
    Yup.object({
      title: Yup.string()
        .required("O campo título é obrigatório ser informado")
        .max(20, "O título é muito grande (max: 20)"),
      url: Yup.string()
        .url()
        .required("O campo URL é obrigatório ser informado"),
    }),
  ),
});

export const defaultHoursValue = {
  title: "",
  url: "",
};
