from django.shortcuts import render
from django.http import HttpResponse
from .models import Board

def index(request):
    context = {'board_list' : '테스트입니다.'}
    return render(request, 'index.html', context)


def post(request):
    if request.method == 'POST':
        board = Board()
        board.title = request.POST['board_title']
        board.content = request.POST['board_content']
        board.save()
        return redirect('post')
    else:
        board = board.objects.all()
        return render(request, 'write.html', {'board' : board})
