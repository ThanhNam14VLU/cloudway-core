export default () => ({
  database: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
  },
  // queue: {},
  // cache: {},
  // logger: {}
});
