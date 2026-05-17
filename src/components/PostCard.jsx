import { Link } from 'react-router-dom'

function PostCard({ post }) {
  const featuredImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url

  const excerpt = post.excerpt.rendered
    .replace(/<\/?[^>]+(>|$)/g, '')
    .trim()

  const categories =
    post._embedded?.['wp:term']?.[0]
      ?.map(cat => cat.name)
      .join(' • ') || 'Mauritian Recipe'

  return (
    <div className="post-card">

      <div className="image-wrapper">

    

        {featuredImage && (
          <img
            src={featuredImage}
            alt={post.title.rendered}
          />
        )}

      </div>

      <div className="post-card-body">

        

        <h2>{post.title.rendered}</h2>

        <p className="post-excerpt">
          {excerpt}
        </p>

        <Link
          to={`/post/${post.id}`}
          className="read-more"
        >
          Read More →
        </Link>

      </div>
    </div>
  )
}

export default PostCard