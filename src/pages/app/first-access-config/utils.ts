import * as Yup from "yup";

export const validateSchemaBasicForm = Yup.object({
  name: Yup.string().min(2, "Nome muito curto"),
  avatarUrl: Yup.mixed(),
  useEnterpriseName: Yup.boolean(),
  enterpriseName: Yup.string().when(
    "useEnterpriseName",
    ([useEnterpriseName], schema) => {
      return useEnterpriseName
        ? schema.required("O nome da empresa deve ser informado")
        : schema;
    },
  ),
  email: Yup.string().required(
    "O e-mail é obrigatório. Caso o campo esteja vazio, contete o nosso suporte ou tente refazer o login com o Google.",
  ),
});

export const validateSchemaUrlForm = Yup.object({
  userUrl: Yup.string().matches(
    /^[a-zA-Z0-9_]+$/,
    "A URL deve conter apenas letras, números e underline.",
  ),
});
export const validateSchemaAboutForm = Yup.object({
  workTitle: Yup.string().required(
    "É obrigatório informar um título de trabalho",
  ),
  about: Yup.string()
    .max(1000, "Limite de texto excedido")
    .nullable()
    .notRequired(),
  instagramUrl: Yup.string().notRequired(),
  linkedInUrl: Yup.string().notRequired(),
  facebookUrl: Yup.string().notRequired(),
  twitterUrl: Yup.string().notRequired(),
});

export const defaultAboutValue =
  "Esse é um modelo de como a descrição irá aparecer para as pessoas que irão visitar seu perfil. Nele pode estar contido referencias ao seus serviços e informações sobre você.";
