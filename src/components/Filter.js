import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} Products</div>
                <div className="filter-sort"> {""} Order <select value={this.props.sort} onChange={this.props.SortProducts}>
                    <option value="latest">Latest</option>
                    <option value="lowest">lowest</option>
                    <option value="highest">highest</option>


                </select></div>
                <div className="filter-size">
                    Filter
                    <select value={this.props.size} onChange={this.props.FilterProducts}>
                        <option value="All">All</option>
                        <option value="XS">XS</option>
                        <option value="X">X</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XL</option>

                    </select>
                </div>

            </div>
        )
    }
}
