from django.db import models

class Board(models.Model):
    
    title = models.CharField(max_length = 200, verbose_name = '게시글 제목', help_text = '* 캐릭터, 배경과 관련된 NFT만 게시!')
    author = models.CharField(max_length = 100, verbose_name = '작성자')
    content = models.TextField(max_length = 200, verbose_name = '내용')
    create_date = models.DateTimeField(auto_now_add =True, verbose_name = '등록일')
    update_date = models.DateTimeField(auto_now=True, verbose_name = '업데이트일')

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'sales_board'
      