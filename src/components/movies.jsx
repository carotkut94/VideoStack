import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "../components/common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "../components/moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const listMovies = paginate(sorted, currentPage, pageSize);

    return {
      total: filtered.length,
      data: listMovies
    };
  }

  render() {
    const { pageSize, currentPage } = this.state;

    const { total, data } = this.getPagedData();

    if (total === 0) return <p>There are no movies in database</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onItemSelect={this.handleSelect}
            items={this.state.genres}
            currentItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {total} movies in database</p>
          <MoviesTable
            sortColumn={this.state.sortColumn}
            onSort={this.handleSort}
            listMovies={data}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
          />
          <Pagination
            onPageChanged={this.handlePageChange}
            pageSize={pageSize}
            itemCount={total}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
