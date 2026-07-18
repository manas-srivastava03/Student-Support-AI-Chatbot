import fitz

def load_pdf(file_path):
    doc = fitz.open(file_path)

    pages = []

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)

        pages.append({
            "page": page_num + 1,
            "text": page.get_text()
        })

    doc.close()

    return pages