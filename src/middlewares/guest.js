export default function auth ({ next, store }){
  if (store.state.auth.user) {
    return next({
      name: 'dashboard'
    })
  }

  return next()
}