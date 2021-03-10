import { Mapper } from "../../domain"
import { MovieEntity } from "../Model/MovieEntity"
import { MovieEntityListValueObject } from "../Model/MovieEntityListValueObject"
import { config } from "../../config"

export class FromListTypeResponseToMovieEntityListMapper extends Mapper {
  static create() {
    return new FromListTypeResponseToMovieEntityListMapper()
  }

  map(rawApiResponse) {
    const { results } = rawApiResponse
    const { imgBaseURL } = config

    const movieEntityList = results?.map((movie) => {
      const {
        id,
        poster_path,
        title,
        tagline,
        vote_average,
        release_date,
        overview
      } = movie

      const poster = `${imgBaseURL}/${poster_path}`

      const movieEntity = MovieEntity.create({
        id,
        poster,
        title,
        tagline,
        rating: vote_average,
        released: release_date,
        description: overview
      })

      return movieEntity
    })

    const movieEntityListValueObject = MovieEntityListValueObject.create({
      movieEntityList: movieEntityList.map((entity) => entity.toJSON())
    })

    return movieEntityListValueObject
  }
}