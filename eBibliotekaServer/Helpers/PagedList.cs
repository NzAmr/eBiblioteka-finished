using System;
using System.Collections.Generic;
using System.Linq;

namespace eBibliotekaServer.Helpers
{
    public class PagedList<T>
    {
        public List<T> DataItems { get; set; } = new List<T>();
        private PagedList(List<T> items, int totalCount, int pageNumber, int pageSize)
        {
            navigation = new PagedListNavigation(totalCount, pageNumber, pageSize);

            this.DataItems.AddRange(items);
        }

        public PagedListNavigation navigation { get; }

        public static PagedList<T> Create(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var totalCount = source.Count();
            var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            return new PagedList<T>(items, totalCount, pageNumber, pageSize);
        }
    }

    public class PagedListNavigation
    {
        public PagedListNavigation(int totalCount, int pageNumber, int pageSize)
        {
            TotalCount = totalCount;
            CurrentPage = pageNumber;
            PageSize = pageSize;
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
        }

        public int CurrentPage { get; set; }

        public int TotalPages { get; set; }

        public int PageSize { get; set; }

        public int TotalCount { get; set; }

        public bool HasPrevious => CurrentPage > 1;

        public bool HasNext => CurrentPage < TotalPages;
    }
}
