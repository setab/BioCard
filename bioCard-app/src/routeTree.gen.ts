/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as RegisterRouteImport } from './routes/register'
import { Route as LoginRouteImport } from './routes/login'
import { Route as PatientRouteRouteImport } from './routes/patient/route'
import { Route as DoctorRouteRouteImport } from './routes/doctor/route'
import { Route as IndexRouteImport } from './routes/index'
import { Route as PatientIndexRouteImport } from './routes/patient/index'
import { Route as DoctorIndexRouteImport } from './routes/doctor/index'
import { Route as PatientDashboardRouteImport } from './routes/patient/dashboard'
import { Route as PatientIdRouteImport } from './routes/patient/$id'
import { Route as DoctorPaitentsRouteImport } from './routes/doctor/paitents'
import { Route as DoctorDashboardRouteImport } from './routes/doctor/dashboard'
import { Route as AdminDashboardRouteImport } from './routes/admin/dashboard'

const RegisterRoute = RegisterRouteImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRouteImport,
} as any)
const LoginRoute = LoginRouteImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRouteImport,
} as any)
const PatientRouteRoute = PatientRouteRouteImport.update({
  id: '/patient',
  path: '/patient',
  getParentRoute: () => rootRouteImport,
} as any)
const DoctorRouteRoute = DoctorRouteRouteImport.update({
  id: '/doctor',
  path: '/doctor',
  getParentRoute: () => rootRouteImport,
} as any)
const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const PatientIndexRoute = PatientIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => PatientRouteRoute,
} as any)
const DoctorIndexRoute = DoctorIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => DoctorRouteRoute,
} as any)
const PatientDashboardRoute = PatientDashboardRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => PatientRouteRoute,
} as any)
const PatientIdRoute = PatientIdRouteImport.update({
  id: '/$id',
  path: '/$id',
  getParentRoute: () => PatientRouteRoute,
} as any)
const DoctorPaitentsRoute = DoctorPaitentsRouteImport.update({
  id: '/paitents',
  path: '/paitents',
  getParentRoute: () => DoctorRouteRoute,
} as any)
const DoctorDashboardRoute = DoctorDashboardRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => DoctorRouteRoute,
} as any)
const AdminDashboardRoute = AdminDashboardRouteImport.update({
  id: '/admin/dashboard',
  path: '/admin/dashboard',
  getParentRoute: () => rootRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/doctor': typeof DoctorRouteRouteWithChildren
  '/patient': typeof PatientRouteRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/admin/dashboard': typeof AdminDashboardRoute
  '/doctor/dashboard': typeof DoctorDashboardRoute
  '/doctor/paitents': typeof DoctorPaitentsRoute
  '/patient/$id': typeof PatientIdRoute
  '/patient/dashboard': typeof PatientDashboardRoute
  '/doctor/': typeof DoctorIndexRoute
  '/patient/': typeof PatientIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/admin/dashboard': typeof AdminDashboardRoute
  '/doctor/dashboard': typeof DoctorDashboardRoute
  '/doctor/paitents': typeof DoctorPaitentsRoute
  '/patient/$id': typeof PatientIdRoute
  '/patient/dashboard': typeof PatientDashboardRoute
  '/doctor': typeof DoctorIndexRoute
  '/patient': typeof PatientIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/doctor': typeof DoctorRouteRouteWithChildren
  '/patient': typeof PatientRouteRouteWithChildren
  '/login': typeof LoginRoute
  '/register': typeof RegisterRoute
  '/admin/dashboard': typeof AdminDashboardRoute
  '/doctor/dashboard': typeof DoctorDashboardRoute
  '/doctor/paitents': typeof DoctorPaitentsRoute
  '/patient/$id': typeof PatientIdRoute
  '/patient/dashboard': typeof PatientDashboardRoute
  '/doctor/': typeof DoctorIndexRoute
  '/patient/': typeof PatientIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/doctor'
    | '/patient'
    | '/login'
    | '/register'
    | '/admin/dashboard'
    | '/doctor/dashboard'
    | '/doctor/paitents'
    | '/patient/$id'
    | '/patient/dashboard'
    | '/doctor/'
    | '/patient/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/login'
    | '/register'
    | '/admin/dashboard'
    | '/doctor/dashboard'
    | '/doctor/paitents'
    | '/patient/$id'
    | '/patient/dashboard'
    | '/doctor'
    | '/patient'
  id:
    | '__root__'
    | '/'
    | '/doctor'
    | '/patient'
    | '/login'
    | '/register'
    | '/admin/dashboard'
    | '/doctor/dashboard'
    | '/doctor/paitents'
    | '/patient/$id'
    | '/patient/dashboard'
    | '/doctor/'
    | '/patient/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DoctorRouteRoute: typeof DoctorRouteRouteWithChildren
  PatientRouteRoute: typeof PatientRouteRouteWithChildren
  LoginRoute: typeof LoginRoute
  RegisterRoute: typeof RegisterRoute
  AdminDashboardRoute: typeof AdminDashboardRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/patient': {
      id: '/patient'
      path: '/patient'
      fullPath: '/patient'
      preLoaderRoute: typeof PatientRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/doctor': {
      id: '/doctor'
      path: '/doctor'
      fullPath: '/doctor'
      preLoaderRoute: typeof DoctorRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/patient/': {
      id: '/patient/'
      path: '/'
      fullPath: '/patient/'
      preLoaderRoute: typeof PatientIndexRouteImport
      parentRoute: typeof PatientRouteRoute
    }
    '/doctor/': {
      id: '/doctor/'
      path: '/'
      fullPath: '/doctor/'
      preLoaderRoute: typeof DoctorIndexRouteImport
      parentRoute: typeof DoctorRouteRoute
    }
    '/patient/dashboard': {
      id: '/patient/dashboard'
      path: '/dashboard'
      fullPath: '/patient/dashboard'
      preLoaderRoute: typeof PatientDashboardRouteImport
      parentRoute: typeof PatientRouteRoute
    }
    '/patient/$id': {
      id: '/patient/$id'
      path: '/$id'
      fullPath: '/patient/$id'
      preLoaderRoute: typeof PatientIdRouteImport
      parentRoute: typeof PatientRouteRoute
    }
    '/doctor/paitents': {
      id: '/doctor/paitents'
      path: '/paitents'
      fullPath: '/doctor/paitents'
      preLoaderRoute: typeof DoctorPaitentsRouteImport
      parentRoute: typeof DoctorRouteRoute
    }
    '/doctor/dashboard': {
      id: '/doctor/dashboard'
      path: '/dashboard'
      fullPath: '/doctor/dashboard'
      preLoaderRoute: typeof DoctorDashboardRouteImport
      parentRoute: typeof DoctorRouteRoute
    }
    '/admin/dashboard': {
      id: '/admin/dashboard'
      path: '/admin/dashboard'
      fullPath: '/admin/dashboard'
      preLoaderRoute: typeof AdminDashboardRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}

interface DoctorRouteRouteChildren {
  DoctorDashboardRoute: typeof DoctorDashboardRoute
  DoctorPaitentsRoute: typeof DoctorPaitentsRoute
  DoctorIndexRoute: typeof DoctorIndexRoute
}

const DoctorRouteRouteChildren: DoctorRouteRouteChildren = {
  DoctorDashboardRoute: DoctorDashboardRoute,
  DoctorPaitentsRoute: DoctorPaitentsRoute,
  DoctorIndexRoute: DoctorIndexRoute,
}

const DoctorRouteRouteWithChildren = DoctorRouteRoute._addFileChildren(
  DoctorRouteRouteChildren,
)

interface PatientRouteRouteChildren {
  PatientIdRoute: typeof PatientIdRoute
  PatientDashboardRoute: typeof PatientDashboardRoute
  PatientIndexRoute: typeof PatientIndexRoute
}

const PatientRouteRouteChildren: PatientRouteRouteChildren = {
  PatientIdRoute: PatientIdRoute,
  PatientDashboardRoute: PatientDashboardRoute,
  PatientIndexRoute: PatientIndexRoute,
}

const PatientRouteRouteWithChildren = PatientRouteRoute._addFileChildren(
  PatientRouteRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DoctorRouteRoute: DoctorRouteRouteWithChildren,
  PatientRouteRoute: PatientRouteRouteWithChildren,
  LoginRoute: LoginRoute,
  RegisterRoute: RegisterRoute,
  AdminDashboardRoute: AdminDashboardRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
