const dominio = 'http://localhost:8000'
//const dominio = 'https://apicalorias.regnierneira.com'


//AUTH
export const RegisterApi = dominio+'/api/auth/register' 

export const LoginApi = dominio+'/api/auth/login' 

export const LogoutApi = dominio+'/api/auth/logout' 

export const MeApi = dominio+'/api/auth/me' 


//ALIMENTOS

export const ShowFood = dominio+'/api/alimentos/show' 

export const SaveFood = dominio+'/api/alimentos/store' 

export const DeleteFood = dominio+'/api/alimentos/delete' 

export const EditFood = dominio+'/api/alimentos/edit'

export const FindFood = dominio+'/api/alimentos/find' 

export const DisplayFood = dominio+'/api/alimentos/display' 

//CALORIAS

export const SaveCalorias = dominio+'/api/calorias/store'

export const ShowCalorias = dominio+'/api/calorias/show' 

export const DeleteCalorias = dominio+'/api/calorias/delete' 

export const FindCalorias = dominio+'/api/calorias/find' 

export const AdvanceCalorias = dominio+'/api/calorias/advancefind'

//IMC

export const ShowImc = dominio+'/api/imc/show'

export const SaveImc = dominio+'/api/imc/store'

export const DeleteImc = dominio+'/api/imc/delete'

//PERFIL

export const MisCalorias = dominio+'/api/perfil/miscaloriasdiarias'
