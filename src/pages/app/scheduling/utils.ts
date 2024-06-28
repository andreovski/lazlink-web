import * as Yup from "yup";

export const validationSchema = Yup.object({
  step: Yup.number(),
  date: Yup.date().required("É necessário informar a data do agendamento"),
  hour: Yup.string().required("É necessário informar a hora do agendamento"),
  name: Yup.string()
    .required("É necessário informar o nome completo")
    .min(4, "Informe o nome completo"),
  phone: Yup.string().required("É necessário informar o telefone"),
  isWhatsApp: Yup.boolean(),
  whatsappPhone: Yup.string().when("isWhatsApp", ([isWhatsApp], schema) => {
    return !isWhatsApp
      ? schema
          .required("É obrigatório informar o número de WhatsApp")
          .min(11, "Informe um número válido")
      : schema;
  }),
  email: Yup.string()
    .email("É necessário informar um e-mail valido")
    .matches(/@[^.]*\./, {
      message: "É necessário informar um e-mail valido",
    })
    .required("É obrigatório informar o email"),
});
