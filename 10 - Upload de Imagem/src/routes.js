// aqui não preciso desta forma importar todo express, mas somente o Router
import { Router } from 'express';

// aqui vamos importar a biblioteca do multer
import multer from 'multer';
// aqui vamos importar as configuracoes do multer
import multerConfig from './config/multer';

// aqui estou importando o middleware de autenticacao da minha aplicacao
import authMiddleware from './app/middlewares/auth';

// middleware para verificar se o user é admin
import AdminMiddleware from './app/middlewares/admin';

// importar o controller de Sessao
import SessionController from './app/controllers/SessionController';

// importar o controller de Company
import CompanyController from './app/controllers/CompanyController';

// importar o controller de Admin
import AdminController from './app/controllers/AdminController';

// importar o controller de Announcement
import AnnouncementController from './app/controllers/AnnouncementController';

// importar o controller de AllAnnouncement
import AllAnnouncementController from './app/controllers/AllAnnouncementsController';

// usando o metodo Router no routes
const routes = new Router();

// o upload vai ter o multer com as configuracoes
const upload = multer(multerConfig);

// rota de autenticacao
routes.post('/session', SessionController.session);

// criar company
routes.post('/company', CompanyController.insert);

// aqui vou definir ele como sendo um middleware global
// ele só vai valer para as rotas que vierem depois dele
// desta forma, o post anterior não tem este middleware
routes.use(authMiddleware);

// buscar todas company
routes.get('/company', AdminMiddleware, AdminController.indexCompany);
// buscar uma company
routes.get(
  '/company/:id_company',
  AdminMiddleware,
  AdminController.detailsCompany
);
// atualizar status de uma company
routes.put(
  '/company/updateStatusCompany/:id_company',
  AdminMiddleware,
  AdminController.updateCompanyStatus
);
// atualizar status de uma company
routes.put('/company', CompanyController.updateCompany);

// criar announcement
routes.post(
  '/announcements',
  upload.single('image'),
  AnnouncementController.insert
);
// buscar todos announcements
routes.get(
  '/announcements',
  AdminMiddleware,
  AdminController.indexAnnouncement
);
// buscar um announcement
routes.get(
  '/announcements/:id_announcement',
  AdminMiddleware,
  AdminController.detailsAnnouncement
);
// buscar todos announcements de uma empresa especifica
routes.get(
  '/companyannouncements',
  AnnouncementController.indexCompanyAnnouncement
);
// buscar um announcement de uma empresa especifica
routes.get(
  '/companyannouncementsDetails/:id_announcement',
  AnnouncementController.detailsCompanyAnnouncement
);
// atualizar um announcement
routes.put(
  '/announcements/:id_announcement',
  AnnouncementController.updateAnnouncement
);
// deletar um announcement
routes.delete(
  '/announcements/:id_announcement',
  AnnouncementController.deleteAnnouncement
);

// buscar announcements de outras empresas
routes.get('/allannouncements', AllAnnouncementController.index);

// vamos criar uma rota que recebe o arquivo
// como vai ser um unico arquivo, vamos usar o single e vai ter file como nome do parametro
// depois disso vamos acionar o store criado no FileController para armazenar o arquivo
// colocamos depois da autenticacao, pois o usuario vai enviar sua foto de perfil
// somente quando tiver atualizando, no cadastro nao faz isso
// retornar req.file traz os dados do arquivo (res.json(req.file))
/* routes.put(
  '/avatar',
  upload.single('file'),
  AvatarImageController.update_avatar_image
); */

export default routes;
