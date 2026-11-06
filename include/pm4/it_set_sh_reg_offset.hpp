#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetShRegOffsetDef {
    static constexpr std::uint8_t opcode = 0x69;
    static constexpr std::string_view name = "IT_SET_SH_REG_OFFSET";
    static constexpr std::string_view desc = "Set base offset index for subsequent shader register writes";
};
}
