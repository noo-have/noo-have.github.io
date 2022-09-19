//@ts-nocheck
import { createSignal } from 'solid-js'

export default (props: {
  file: {}
  title: string
}) => {
  const posts = props.file.sort(
    (a, b) =>
      new Date(b.frontmatter.pubDate).valueOf() -
      new Date(a.frontmatter.pubDate).valueOf()
  )
  const [fold, setFold] = createSignal(false)
  const isFold = () => fold()
  const useFold = () => setFold(!fold())
  const fileList = () => {
    return (
      <div>
        {isFold() && (
          <ul>
            {posts.map(file => (
              <li>
                <time
                  style='margin: 10px'
                  datetime={file.frontmatter.pubDate}
                >
                  {new Date(
                    file.frontmatter.pubDate
                  ).toLocaleDateString('zh-cn', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
                <a href={file.url}>
                  {file.frontmatter.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
  return (
    <>
      <h3>
        <span
          style='font-size: 10px'
          onClick={useFold}
        >
          {isFold() ? 'v' : '·'}
        </span>
        {props.title}
      </h3>
      {fileList()}
    </>
  )
}