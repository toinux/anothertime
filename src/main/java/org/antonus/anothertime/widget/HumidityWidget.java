package org.antonus.anothertime.widget;

import org.antonus.anothertime.model.AwtrixStats;
import org.antonus.anothertime.model.Bitmap;
import org.antonus.anothertime.model.Draw;
import org.antonus.anothertime.model.Text;
import org.antonus.anothertime.service.AwtrixService;
import org.antonus.anothertime.service.IconsService;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.antonus.anothertime.utils.ColorUtils.dimColor;

public class HumidityWidget implements Widget {

    private final AwtrixService awtrixService;
    private final IconsService iconsService;

    public HumidityWidget(AwtrixService awtrixService, IconsService iconsService) {
        this.iconsService = iconsService;
        this.awtrixService = awtrixService;
    }
    @Override
    public List<Draw> drawList(int offset, float dim) {

        Color color = dimColor(Color.white, dim);

        List<Draw> drawList = new ArrayList<>();

        var humidityIcon = iconsService.getIcon("smallhumidity.gif");
        if (dim < 1) {
            humidityIcon = iconsService.getDimmedIcon("smallhumidity.gif", dim);
        }

        // TODO: gérer l'icone
        boolean hasIcon = null != humidityIcon;

        if (outboundOffset(offset)) {
            return Collections.emptyList();
        }

        /*
        	Dim xpos As Int = 19

	' Won't manage 100%, cap to 99%
	Dim hum As Int = Min(NumberFormat(getHumidity,0,0),99)

	If hum < 10 Then
		xpos = xpos + 4
	End If

	If humidityIcon Then
		App.drawBMP(xpos,offset,App.getIcon(humidityIconId),8,8)
		App.drawText(hum,xpos + 5,1+offset,Null)
	Else
		App
        */


        int xpos = 19;

        AwtrixStats awtrixStats = awtrixService.getAwtrixStats();

        // Won't manage 100%, cap to 99%
        int humidity = null == awtrixStats ? 0 : Math.min(awtrixStats.hum(),99);

        if (humidity < 10) {
            xpos += 4;
        }



        if (hasIcon) {
            drawList.add(new Bitmap(xpos, offset, 8, 8, humidityIcon));
            xpos += 3;
        }

        drawList.add(new Text(xpos + 3, 1 + offset, String.valueOf(humidity), color));

        return drawList;

    }
}
