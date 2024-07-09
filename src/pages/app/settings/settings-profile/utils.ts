import * as Yup from "yup";

export const settingsProfileValidationSchema = Yup.object({
  _id: Yup.string().required(),
  avatarUrl: Yup.mixed().nullable(),
  name: Yup.string().required("Esse campo é obrigatório ser informado"),
  email: Yup.string().required("Esse campo é obrigatório ser informado"),
  useEnterpriseName: Yup.boolean(),
  enterpriseName: Yup.string().when(
    "useEnterpriseName",
    ([useEnterpriseName], schema) => {
      return useEnterpriseName
        ? schema.required("O nome da empresa deve ser informado")
        : schema.notRequired();
    },
  ),
  workTitle: Yup.string().required("Esse campo é obrigatório ser informado"),
  about: Yup.string()
    .max(1000, "Limite de texto excedido")
    .nullable()
    .notRequired(),
  cellphone: Yup.string()
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
  address: Yup.object({
    postalCode: Yup.string().required("Esse campo é obrigatório ser informado"),
    street: Yup.string().required("Esse campo é obrigatório ser informado"),
    city: Yup.string().required("Esse campo campo é obrigatório ser informado"),
    state: Yup.string().required(
      "Esse campo campo é obrigatório ser informado",
    ),
    complement: Yup.string().notRequired(),
  }),
  instagramUrl: Yup.string().notRequired(),
  linkedInUrl: Yup.string().notRequired(),
  facebookUrl: Yup.string().notRequired(),
  twitterUrl: Yup.string().notRequired(),
  recommendation: Yup.string()
    .email("Digite um e-mail válido")
    .nullable()
    .notRequired(),
  userUrl: Yup.string(),
  theme: Yup.object(),
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
