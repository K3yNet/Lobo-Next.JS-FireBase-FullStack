import * as Yup from 'yup';

export interface User {
  nome: string;
  email: string;
  cpf: string;
  phone: string;
  birth: string;
  cidade: string;
  password: string;
  confirmPassword: string;
}

export const validationSchema = Yup.object().shape({
  nome: Yup.string()
    .matches(/^[a-zA-ZÀ-ÿ\s]*$/, 'Apenas letras são permitidas')
    .required('O nome é obrigatório'),
  email: Yup.string()
    .required('O email é obrigatório')
    .email('O email é inválido'),
  cpf: Yup.string()
    .matches(/^\d{11}$/, 'CPF inválido')
    .required('O CPF é obrigatório'),
  phone: Yup.string()
    .matches(/^\d{11}$/, 'Número de telefone inválido')
    .required('O número de telefone é obrigatório'),
  birth: Yup.date().required('A data de nascimento é obrigatória'),
  cidade: Yup.string()
    .matches(/^[a-zA-ZÀ-ÿ\s]*$/, 'Apenas letras são permitidas')
    .required('A cidade é obrigatória'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem corresponder')
    .required('A confirmação de senha é obrigatória'),
});