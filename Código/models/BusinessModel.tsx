import * as Yup from 'yup';

export interface User {
  nomeInst: string;
  nomeAdm: string;
  email: string;
  cnpj: string;
  phone: string;
  addrs: string;
  password: string;
  confirmPassword: string;
}

export const validationSchema = Yup.object().shape({
  nomeInst: Yup.string()
    .required('O nome da Instituição é obrigatório'),
  nomeAdm: Yup.string()
    .matches(/^[a-zA-ZÀ-ÿ\s]*$/, 'Apenas letras são permitidas')
    .required('O nome do Administrador é obrigatório'),
  email: Yup.string()
    .required('O email é obrigatório')
    .email('O email é inválido'),
  cnpj: Yup.string()
    .matches(/^\d{14}$/, 'CNPJ inválido')
    .required('O CNPJ é obrigatório'),
  phone: Yup.string()
    .matches(/^\d{11}$/, 'Número de telefone inválido')
    .required('O número de telefone é obrigatório'),
  addrs: Yup.string()
    .required('O Endereço é obrigatória'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem corresponder')
    .required('A confirmação de senha é obrigatória'),
});