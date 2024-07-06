// import { getProfessionalById } from "@/api/professional";
// import { atom, selector } from "recoil";

// const defaultUserValue = {
//   _id: "",
// } as IProfessional;

// export const professionalAtom = atom<IProfessional>({
//   key: "professionalAtom",
//   default: defaultUserValue,
// });

// export const professionalState = selector({
//   key: "professionalSelector",
//   // get: ({ get }) => get(professionalAtom),
//   get: async () => {
//     console.log("entrou");
//     const res = await getProfessionalById({ id: "6681fcae392b3ef73236f87f" });

//     return res;
//   },
// });
