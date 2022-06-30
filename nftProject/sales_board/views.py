from django.shortcuts import render
from django.http import HttpResponse
from .models import Board
from django.utils import timezone

def list(request):
    all_boards = Board.objects.all().order_by("create_date")
    return render(request, 'index.html', {'title' : '판매 게시글 목록', 'board_list' : all_boards})


def post(request):
    new_board = Board()
    if request.method == 'POST':
        new_board.title = request.POST['board_title']
        new_board.content = request.POST['board_content']
        new_board.create_date = timezone.now()
        new_board.save()
    
    return render(request, 'write.html')
   