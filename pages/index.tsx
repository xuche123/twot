import Header from '../components/Header'
import Form from '@/components/Form'
import PostFeed from '@/components/Posts/PostFeed'

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder='Whats on your mind?' />
      <PostFeed />
    </>
  )
}
